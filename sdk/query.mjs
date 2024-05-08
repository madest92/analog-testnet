//https://docs.analog.one/documentation/developers/analog-watch/developers-guide/querying-data
import 'dotenv/config';
import { TimegraphClient } from '@analog-labs/timegraph-js';

const sessionKey = process.env.SESSION_KEY;

if (!sessionKey) {
  console.log("Please provide values for SESSION_KEY environment variables. See ssk.mjs");
  process.exit(1);
}

const timeGraphClient = new TimegraphClient({
  url: 'https://timegraph.testnet.analog.one/graphql', // A url to Watch GraphQL instance.
  sessionKey: process.env.SESSION_KEY, // Session key created by user wallet using WASM SDK
});


async function main () {
  // Request to query the view..... 
  await timeGraphClient.view.data(
  { 
    hashId: "QmWmQhD9qH5WZZepbZhSPu6Lev42eXEPxn6UUNUiDD7hbg",
    fields: ["name"],
    limit: "5"
  }); 

  const response = await timeGraphClient.view.data(
  { 
    hashId: process.env.QUERY_HASH_ID,
    fields: [process.env.QUERY_HASH_FIELD],
    limit: "5"
  }); 
  console.log(response);
}

main().catch(console.error).finally(() => process.exit());
