// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
* @title ERC20 Token named A
* @author kyrers
* @notice Basic ERC20 token to use as an example in the DEX. It has no max supply.
*/
contract TokenA is ERC20, Ownable {
    /*------------------------------------------------------------
                                 FUNCTIONS
    --------------------------------------------------------------*/
    /**
    * @notice Mint 1000 tokens to the owner
    */
    constructor() ERC20("Token A", "TKA") { 
        _mint(msg.sender, 1000 ether);
    }

    /**
    * @notice Allow users to mint tokens to experiment with the DEX
    * @param _amount The amount of tokens to mint
    */
    function mint(uint256 _amount) external {
        _mint(msg.sender, _amount);
    }
}
