const MyToken = artifacts.require("MyToken");
const MyTokenSale = artifacts.require("MyTokenSale");
const MyKycContract = artifacts.require("KycContract");

require("dotenv").config({ path: "../.env" });

console.log("Log: ", typeof process.env.INITIAL_TOKENS);
const CF_INITIAL_TOKENS = parseInt(process.env.INITIAL_TOKENS);

module.exports = async function (deployer) {
  let addr = await web3.eth.getAccounts();

  await deployer.deploy(MyKycContract);
  await deployer.deploy(MyToken, CF_INITIAL_TOKENS);
  await deployer.deploy(
    MyTokenSale,
    1,
    addr[0],
    MyToken.address,
    MyKycContract.address
  );

  let instance = await MyToken.deployed();
  await instance.transfer(MyTokenSale.address, CF_INITIAL_TOKENS);
};
