const Token = artifacts.require("MyToken");
const chai = require("./setUpChai");
const BN = web3.utils.BN;
const expect = chai.expect;

// var chai = require("chai");
// const BN = web3.utils.BN;
// const chaiBN = require("chai-bn")(BN);
// chai.use(chaiBN);

// var chaiAsPromise = require("chai-as-promised");
// chai.use(chaiAsPromise);
require("dotenv").config({ path: "../.env" });

const CF_INITIAL_TOKENS = parseInt(process.env.INITIAL_TOKENS);

contract("Token Test", function (accounts) {
  const [deployerAccount, recipient] = accounts;
  console.log({
    deployerAccount,
    recipient,
  });

  beforeEach(async () => {
    this.myToken = await Token.new(CF_INITIAL_TOKENS);
  });

  it("all tokens should be in my account", async () => {
    // let instance = await Token.deployed()
    let instance = this.myToken;
    let totalSupply = await instance.totalSupply();
    expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply); // 1000000
  });

  it("it possible to send tokens between accounts", async () => {
    const sendTokens = 1;
    // let instance = await Token.deployed()
    let instance = this.myToken;
    let totalSupply = await instance.totalSupply();
    expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply); // 1000000
    await expect(instance.transfer(recipient, sendTokens)).to.eventually.be
      .fulfilled;
    expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens))); // 999999
    expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(
      new BN(sendTokens)
    );
  });

  it("is not possible to send more tokens than available in total", async () => {
    // let instance = await Token.deployed()
    let instance = this.myToken;
    let balanceOfDeployer = await instance.balanceOf(deployerAccount);
    await expect(instance.transfer(recipient, new BN(balanceOfDeployer + 1))).to
      .eventually.be.rejected;
    expect(
      instance.balanceOf(deployerAccount)
    ).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
  });
});
