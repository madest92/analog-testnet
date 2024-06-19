// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGmpReceiver {
    function onGmpReceived(bytes32 id, uint128 network, bytes32 source, bytes calldata payload)
        external
        payable
        returns (bytes32);
}

contract Counter is IGmpReceiver {
    address private immutable _gateway;
    uint256 public number;

    // address 0x000000007f56768de3133034fa730a909003a165
    constructor(address gateway) {
        _gateway = gateway;
    }

    function onGmpReceived(bytes32, uint128, bytes32, bytes calldata) external payable returns (bytes32) {
        require(msg.sender == _gateway, "unauthorized");
        number++;
        return bytes32(number);
    }
}
