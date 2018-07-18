pragma solidity ^0.4.2;

contract AcademiaTokenInterface {
    function balanceOf(address _admin) public returns(uint);
    function transfer(address _to, uint _value) public returns (bool success);
}

contract AcademiaDiplomaManager {
    AcademiaTokenInterface academiaTokenContract;
    address private admin;

    struct Diplome {
        string name;
        uint timestamp;
        string firstname;
        string lastname;
        uint userid;
    }

    Diplome[] public diplomes;

    mapping (uint => address) public diplomeToOwner;
    mapping (address => uint) ownerToDiplomesCount;
    mapping (address => uint[]) ownerToDiplomaIds;
    mapping (address => bool) isValidator;

    event NewDiploma(
        address _sender,
        string _dipName,
        uint _dipId
    );

    modifier onlyAdminDiploma() {
        require(msg.sender == admin);
        _;
    }

    constructor (address _tokenAddress) public {
        admin = msg.sender;
        academiaTokenContract = AcademiaTokenInterface(_tokenAddress);
        isValidator[msg.sender] = true;
    }

    function uploadDiploma(string _name, string _firstname, string _lastname, uint _id, uint _timestamp) public returns(bool success){
        require(isValidator[msg.sender]);
        uint id = diplomes.push(Diplome(_name, _timestamp, _firstname, _lastname, _id)) - 1;      
        diplomeToOwner[id] = msg.sender;
        ownerToDiplomesCount[msg.sender]++;
        emit NewDiploma(msg.sender, _name, id);
        return true;
    }

    function addValidator(address _newValidator) public onlyAdminDiploma {
        require(!isValidator[_newValidator]);
        isValidator[_newValidator] = true;
    }

    function setAcademiaTokenContractAddress(address _tokenAddress) external onlyAdminDiploma {
        academiaTokenContract = AcademiaTokenInterface(_tokenAddress);
    } 
    
    function getDiplomaIds() public view returns(uint[] ids) {
        return ownerToDiplomaIds[msg.sender];
    }

    function getDiplomaInfo(uint id) public view returns(string diplomaname, string firstname, string lastname) {
        return (diplomes[id].name, diplomes[id].firstname, diplomes[id].lastname);
    }
}