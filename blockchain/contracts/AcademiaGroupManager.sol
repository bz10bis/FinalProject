pragma solidity ^0.4.2;

contract AcademiaTokenInterface {
    function balanceOf(address _admin) public returns(uint);
    function transfer(address _to, uint _value) public returns (bool success);
}

contract AcademiaGroupManager {
    AcademiaTokenInterface academiaTokenContract;
    uint public numberOfMembers;
    uint public joinPrice;
    address public groupAdmin;
    address[] public members;

    event NewMember(
        address _newMember
    );

    constructor (uint _numberOfMembers, uint _joinPrice) public {
        numberOfMembers = _numberOfMembers;
        groupAdmin = msg.sender;
        joinPrice = _joinPrice;
    }

    function addMember(address _member) public {
        members.push(_member);
        emit NewMember(_member);
    }

    function joinGroup() external {
        require(members.length + 1 <= numberOfMembers);
        members.push(msg.sender);
        academiaTokenContract.transfer(this, joinPrice);
        emit NewMember(msg.sender);
    }
}