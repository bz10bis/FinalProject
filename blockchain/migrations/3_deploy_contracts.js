var AcademiaToken = artifacts.require("./AcademiaToken.sol");
var AcademiaTokenSale = artifacts.require("./AcademiaTokenSale.sol");
var AcademiaDocumentStorage = artifacts.require("./AcademiaDocumentStorage.sol");

var initialCoinSupply = 1000000;
var tokenPrice = 1000000000000000;
var uploadPrice = 100;
var academiaTokenContractAddress;

module.exports = function(deployer) {
  deployer.deploy(AcademiaToken, initialCoinSupply).then(function() {
    deployer.deploy(AcademiaTokenSale, AcademiaToken.address, tokenPrice);    
    return deployer.deploy(AcademiaDocumentStorage, uploadPrice, AcademiaToken.address); 
  });
};
