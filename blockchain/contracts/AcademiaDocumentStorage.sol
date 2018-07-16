pragma solidity ^0.4.2;

//import "./AcademiaToken.sol";

contract AcademiaTokenInterface {
    function balanceOf(address _admin) public returns(uint);
    function transfer(address _to, uint _value) public returns (bool success);
}

contract AcademiaDocumentStorage {

    AcademiaTokenInterface academiaTokenContract;
    uint public uploadPrice;
    address private admin;

    struct Document {
        string name;
        uint docHash;
    }

    Document[] public documents;

    mapping (uint => address) public documentToOwner;
    mapping (address => uint) ownerToDocumentsCount;
    
    event NewDocument(
        address _owner,
        uint _docId,
        uint _docHash
    );

    event UpdateDocument(
        uint _hash,
        uint _newHash
    );

    event TransferDocument(
        uint _docId,
        address _owner,
        address _newOwner
    );

    event UpdateAddress(
        address admin,
        address newAddress
    );

    modifier onlyOwner(uint _docId) {
        require(msg.sender == documentToOwner[_docId]);
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    constructor (uint _uploadPrice, address _tokenAddress) public {
        uploadPrice = _uploadPrice;
        admin = msg.sender;
        academiaTokenContract = AcademiaTokenInterface(_tokenAddress);
    }

    function createDocument(string _name, uint _docHash) public returns(bool success) {
        require(academiaTokenContract.balanceOf(msg.sender) >= uploadPrice);
        uint id = documents.push(Document(_name, _docHash)) - 1;
        documentToOwner[id] = msg.sender;
        ownerToDocumentsCount[msg.sender]++;
        //academiaTokenContract.transfer(admin, uploadPrice);
        //academiaTokenContract.balanceOf(msg.sender) = academiaTokenContract.balanceOf(msg.sender).sub(uploadPrice);
        emit NewDocument(msg.sender, id, _docHash);
        return true;
    }

    function updateDocument(uint _docId, uint _newHash) public onlyOwner(_docId) {
        Document storage myDocument = documents[_docId];
        emit UpdateDocument(myDocument.docHash, _newHash);
        myDocument.docHash = _newHash;
    }

    function transferOwnership(uint _docId, address _newOwner) public onlyOwner(_docId) {
        require(_newOwner != address(0));   
        ownerToDocumentsCount[msg.sender]--;
        ownerToDocumentsCount[_newOwner]++;
        documentToOwner[_docId] = _newOwner;
        emit TransferDocument(_docId, msg.sender, _newOwner);
    }

    function setAcademiaTokenContractAddress(address _tokenAddress) external onlyAdmin {
        academiaTokenContract = AcademiaTokenInterface(_tokenAddress);
        emit UpdateAddress(msg.sender, _tokenAddress);
    }
}