pragma solidity ^0.4.2;

import "./SafeMath.sol";

contract AcademiaToken {
    
    using SafeMath for uint256;

    string public name = "Academia Token";
    string public symbol = "ACT";
    uint8 public decimals = 18;
    uint public totalSupply;

    mapping (address => uint) public balanceOf;
    mapping (address => mapping (address => uint)) public allowance;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    constructor (uint _totalSupply) public {
        totalSupply = _totalSupply;        
        balanceOf[msg.sender] = _totalSupply;
    }

    function transfer(address _to, uint _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] = balanceOf[msg.sender].sub(_value);
        balanceOf[_to] = balanceOf[_to].add(_value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_from] = balanceOf[_from].sub(_value);
        balanceOf[_to] = balanceOf[_to].add(_value);
        allowance[_from][msg.sender].sub(_value);
        emit Transfer(_from, _to, _value);
        return true;
    }
}