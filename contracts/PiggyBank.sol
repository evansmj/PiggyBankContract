//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PiggyBank is Ownable {

    uint256 public bankBalance;
    bool private locked;
    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);

    constructor() {
        bankBalance = 0;
    }

    function about() public pure returns (string memory) {
        return "Hello world i am a piggy bank";
    }

    /**
     * Deposit Ether into the piggy bank, must be <= 10,000 gwei.
     */
    function deposit() external payable {
        bankBalance += msg.value;
        require(msg.value <= 10000 gwei, "Too much money, deposit below 10,000 gwei");
        emit Deposit(msg.value);
    }

    /**
     * Transfer all Ether from this contract to the owner.
     * Only callable by the owner, so no reentrancy to worry about.
     */
    function withdraw() external onlyOwner {
        bankBalance = 0;
        (bool success, ) = owner().call{value: bankBalance}("");
        require(success, "Failed to send Ether");
        emit Withdraw(bankBalance);
    }
}
