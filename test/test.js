const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PiggyBank", function () {
  it("Should return the about text", async function () {
    const PB = await ethers.getContractFactory("PiggyBank");
    const pb = await PB.deploy();
    await pb.deployed();

    expect(await pb.about()).to.equal("Hello world i am a piggy bank");
  });

  it("Should deposit successfully", async function () {
    const PB = await ethers.getContractFactory("PiggyBank");
    const pb = await PB.deploy();
    await pb.deployed();
    const provider = ethers.getDefaultProvider();

    expect(await pb.bankBalance()).to.equal(0.0);

    await pb.deposit({value: await ethers.utils.parseUnits("30.0", "gwei")});

    let currentBalance = await pb.bankBalance();
    let gweiBalance = await ethers.utils.parseUnits(currentBalance.toString(), "gwei");

    let actualBalance = await pb.bankBalance();
    let expectedBalance = await ethers.utils.parseUnits("30.0", "gwei");

    expect(actualBalance).to.equal(expectedBalance);
  });

    it("Should fail to deposit if msg.value > 10,000 gwei", async function () {
      const PB = await ethers.getContractFactory("PiggyBank");
      const pb = await PB.deploy();
      await pb.deployed();

      await expect(pb.deposit({value: ethers.utils.parseUnits("13337", "gwei")})).to.be.reverted;
    });

});
