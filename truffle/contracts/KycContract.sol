// SPDX-License-Identifier: MIT
pragma solidity >=0.6.1 <0.9.0;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract KycContract {
    mapping (address => bool) allowed;

    function setKycCompleted(address _addr) public {
        allowed[_addr] = true;
    }

    function setKycRevoked(address _addr) public {
        allowed[_addr] = false;
    }

    function kycCompleted(address _addr) public {
        allowed[_addr] = false;
    }
}