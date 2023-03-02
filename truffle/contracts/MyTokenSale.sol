// SPDX-License-Identifier: MIT
pragma solidity >=0.6.1 <0.9.0;

import "./Crowdsale.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
import "./KycContract.sol";

contract MyTokenSale is Crowdsale {
    KycContract kyc;

    constructor(
        uint256 rate, // rate in TKNbits
        address payable wallet,
        IERC20 token,
        KycContract _kyc
    ) Crowdsale(rate, wallet, token) {
        kyc = _kyc;
    }
}
