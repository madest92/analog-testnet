// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {GmpSender} from "./Primitives.sol";

/**
* @dev Required interface of an Gateway compliant contract
*/

/*
At Address - 0x000000007f56768de3133034fa730a909003a165

submitMessage:
gasLimit 30000
data     0x01
sepolia address 0xF871c929bE8Cd8382148C69053cE5ED1a9593EA7 and net 7
shibuya address 0xB5D83c2436Ad54046d57Cd48c00D619D702F3814 and net 5
*/

interface IGateway {
    event GmpCreated(
        bytes32 indexed id,
        bytes32 indexed source,
        address indexed destinationAddress,
        uint16 destinationNetwork,
        uint256 executionGasLimit,
        uint256 salt,
        bytes data
    );

    function networkId() external view returns (uint16);

    function deposit(GmpSender sender, uint16 sourceNetwork) external payable;

    function depositOf(GmpSender sender, uint16 sourceNetwork) external view returns (uint256);

    function submitMessage(
        address destinationAddress,
        uint16 destinationNetwork,
        uint256 executionGasLimit,
        bytes calldata data
    ) external payable returns (bytes32);
}
