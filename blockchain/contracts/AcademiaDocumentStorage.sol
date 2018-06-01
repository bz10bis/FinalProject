pragma solidity ^0.4.2;

import "./AcademiaToken.sol";

contract AcademiaDocumentStorage is AcademiaToken(1000000) {

    uint public uploadPrice;

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

    modifier onlyOwner(uint _docId) {
        require(msg.sender == documentToOwner[_docId]);
        _;
    }

    constructor (uint _uploadPrice) public {
        uploadPrice = _uploadPrice;
    }

    function createDocument(string _name, uint _docHash) public payable returns(bool success) {
        require(balanceOf[msg.sender] >= uploadPrice);
        uint id = documents.push(Document(_name, _docHash)) - 1;
        documentToOwner[id] = msg.sender;
        ownerToDocumentsCount[msg.sender]++;
        balanceOf[msg.sender] = balanceOf[msg.sender].sub(uploadPrice);
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
}