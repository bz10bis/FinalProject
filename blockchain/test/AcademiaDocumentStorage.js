var AcademiaDocumentStorage = artifacts.require('./AcademiaDocumentStorage.sol');

constract('AcademiaDocumentStorage', function(accounts) {
    it('Initialize with correct values', function() {
        return AcademiaDocumentStorage.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.uploadPrice();
        }).then(function(uploadPrice) {
            assert.equal(uploadPrice, 100, 'Has the correct upload price');
        });
    });
});