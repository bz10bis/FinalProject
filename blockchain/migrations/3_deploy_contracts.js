var AcademiaToken = artifacts.require("./AcademiaToken.sol");
var AcademiaTokenSale = artifacts.require("./AcademiaTokenSale.sol");
var AcademiaTokenStorage = artifacts.require("./AcademiaDocumentStorage.sol");

var initialCoinSupply = 1000000;
var tokenPrice = 1000000000000000;
var academiaTokenContractAddress;

module.exports = function(deployer) {
  deployer.deploy(AcademiaToken, initialCoinSupply).then(function() {
    return deployer.deploy(AcademiaTokenSale, AcademiaToken.address, tokenPrice);    
  });
};
