var AcademiaTokenSale = artifacts.require('./AcademiaTokenSale.sol');
var AcademiaToken = artifacts.require('./AcademiaToken.sol');

contract('AcademiaTokenSale', function(accounts) {
    var tokenSaleInstance;
    var tokenPrice = 1000000000000000;

    it('Initializes with correct values', function() {
        return AcademiaTokenSale.deployed().then(function(instance) {
            tokenSaleInstance = instance;
            return tokenSaleInstance.tokenPrice();
        }).then(function(price) {
            assert.equal(price, tokenPrice, 'Token price is correct');            
        });
    });
});