var SafeMath = artifacts.require("./SafeMath.sol");
var ERC20 = artifacts.require("./ERC20interface.sol");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  // deployer.deploy(ERC20);
};
