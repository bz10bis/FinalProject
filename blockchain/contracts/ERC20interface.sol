pragma solidity ^0.4.2;

contract ERC20Interface {
    function totalSupply() public returns (uint);
    function transfer(address to, uint nbrTokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);
    function allowance(address tokenOwner, address spender) public returns (uint remaining);
    function balanceOf(address tokenOwner) public view returns (uint balance);
       
    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}