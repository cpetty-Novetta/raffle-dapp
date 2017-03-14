var StandardToken = artifacts.require("./StandardToken.sol");
var HumanStandardToken = artifacts.require("./HumanStandardToken.sol");
var Jailbreak = artifacts.require("./JailbreakRaffle.sol");

// Constructor arguments
var initialAmount = 1000000;
var tokenName = "test";
var numDecimals = 0;
var tokenSymbol = "TST";

module.exports = function(deployer) {
  // deployer.deploy(StandardToken);
  // deployer.link(StandardToken, HumanStandardToken);
  // deployer.deploy(HumanStandardToken);
  // deployer.link(HumanStandardToken, Jailbreak);
  // deployer.deploy(Jailbreak, initialAmount, tokenName, numDecimals, tokenSymbol);
  deployer.deploy(Jailbreak);
};
