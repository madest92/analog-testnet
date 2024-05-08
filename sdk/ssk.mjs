// https://docs.analog.one/documentation/developers/analog-watch/developers-guide/utilities/session-key-generator
import 'dotenv/config';
import dotenv from "dotenv";
import fs from 'fs';
import path from 'path';
import { build_apikey, new_cert } from "@analog-labs/timegraph-wasm"; // SKG package
import { keygen } from "@analog-labs/timegraph-js"; // Watch Client
import { Keyring } from "@polkadot/keyring";
import { hexToU8a } from "@polkadot/util";
import { waitReady } from '@polkadot/wasm-crypto';

dotenv.config();

const walletSeed = process.env.WALLET_SEED;
const substrateAddress = process.env.WALLET_SUBSTRATE_ADDRESS;

if (!walletSeed || !substrateAddress) {
  console.log("Please provide values for WALLET_SEED and WALLET_SUBSTRATE_ADDRESS environment variables.");
  process.exit(1);
}

const pathKey = path.join("./.apikeys");
const pathEnv = path.join("./.env");

if (fs.existsSync(pathKey)) {
  console.log("The .apikeys file already exists.");
  process.exit(0);
}

const keyring = new Keyring({ type: "sr25519" });
const [certificate, secret] = new_cert(substrateAddress, "developer");

waitReady()
  .then(async () => {
    const keypair = keyring.addFromMnemonic(walletSeed);
    const _keygen = new keygen({ signer: keypair.sign, address: keypair.address });
    const signedData = keypair.sign(certificate);

    const data = build_apikey(secret, certificate, signedData);
    const sessionKey = await _keygen.createSessionkey(30000000000);

    const appendData = [JSON.stringify(data, null, 2), JSON.stringify(sessionKey, null, 2)];
    fs.appendFile(pathKey, appendData.join("\n"), function(err) {
      if (err) throw err;
      console.log("The .apikeys file has been created successfully.");
    });

    const ssk = sessionKey.ssk;
    const envData = fs.readFileSync(pathEnv, 'utf-8');
    const updatedEnvData = envData.replace(/SESSION_KEY=.*/, `SESSION_KEY="${ssk}"`);
    fs.writeFileSync(pathEnv, updatedEnvData);
    console.log("The SESSION_KEY has been updated successfully.");
  })
  .catch((error) => {
    console.log('Error:', error);
  });
