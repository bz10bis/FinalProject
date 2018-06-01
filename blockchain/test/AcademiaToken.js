var AcademiaToken = artifacts.require('./AcademiaToken.sol');

contract('AcademiaToken', function(accounts) {
    var tokenInstance;
    var ref_totalSupply = 1000000;
    var ref_greaterThanSupply = ref_totalSupply * 999;
    var ref_transferValue = 10;

    it('Initializes with correct values', function() {
        return AcademiaToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name) {
            assert.equal(name, 'Academia Token', 'Has the correct name');
            return tokenInstance.symbol();
        }).then(function(symbol) {
            assert.equal(symbol,'ACT', 'Has the correct symbol');
            return tokenInstance.decimals()
        });
    });

    it('Initializes and allocate tokens', function() {
        return AcademiaToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply, ref_totalSupply, 'Has the correct initial supply');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), ref_totalSupply, 'Allocate token to master');
        });
    });

    it('Transfers tokens', function() {
        return AcademiaToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1], ref_greaterThanSupply);
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
            return tokenInstance.transfer.call(accounts[1], ref_transferValue);
        }).then(function(success) {
            assert.equal(success, true, 'Returned true');
            return tokenInstance.transfer(accounts[1], ref_transferValue);
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, 'Trigger an event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'Transfer event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'The transaction came from account0');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'Transfered to account1');
            assert.equal(receipt.logs[0].args._value, ref_transferValue, 'Value is ok');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), ref_totalSupply - ref_transferValue, 'Remove tokens of main account');
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), ref_transferValue, 'Add tokens to target account');
        });
    });

    it('Allows delegation', function() {
        return AcademiaToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.approve.call(accounts[1], ref_transferValue);
        }).then(function(success) {
            assert.equal(success, true, 'Returned true');
            return tokenInstance.approve(accounts[1], ref_transferValue);
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, 'Trigger an event');
            assert.equal(receipt.logs[0].event, 'Approval', 'Approval event');
            assert.equal(receipt.logs[0].args._owner, accounts[0], 'The delegation came from account0');
            assert.equal(receipt.logs[0].args._spender, accounts[1], 'Delegated to account1');
            assert.equal(receipt.logs[0].args._value, ref_transferValue, 'Value is ok');
        });
    });

    it('Manages delegation token transfers', function() {
        return AcademiaToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.transfer(accounts[2], 100, { from: accounts[0]});
        }).then(function(receipt) {
            return tokenInstance.approve(accounts[4], 10, { from: accounts[2] });
        }).then(function(receipt) {
            return tokenInstance.transferFrom(accounts[2], accounts[3], 9999, { from: accounts[4] });
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'cant transfer value greater than balance');
            return tokenInstance.transferFrom(accounts[2], accounts[3], 20, { from: accounts[4] });
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >= 0, 'cant transfer value greater than allowance');
            return tokenInstance.transferFrom(accounts[2], accounts[3], ref_transferValue, { from: accounts[4] });
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, 'Trigger an event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'Transfer event');
            assert.equal(receipt.logs[0].args._from, accounts[2], 'The transaction came from account2');
            assert.equal(receipt.logs[0].args._to, accounts[3], 'Transfered to account3');
            assert.equal(receipt.logs[0].args._value, ref_transferValue, 'Transfered value');
        });
    });
});