const fs = require('fs');
const web3 = new Web3(Web3.givenProvider);
const myaddress = "";

// ACADEMIA TOKEN
let academiaTokenJSON = "AcademiaToken.json";
let academiaTokenABI = JSON.parse(fs.readFileSync(academiaTokenJSON));
let academiaTokenAddress = "0x05a3d2e93d1fbe34517c6080af16505436c1e7be";
const academiaTokenContract = new web3.eth.Contract(academiaTokenABI, academiaTokenAddress);

// Récuperer le solde de token de l'utilisateur courant
academiaTokenContract.methods.balanceOf(myaddress).call({from:myaddress}, function(err, res) {
    console.log(res);
});

// ACADEMIA DIPLOME
let academiaDiplomaManagerJSON = "AcademiaDiplomaManager.json";
let academiaDiplomaManagerABI = JSON.parse(fs.readFileSync(academiaDiplomaManagerJSON));
let academiaDiplomaManagerAddress = "0x6c3597558366b3ac76f660c57e495c95d993182b";
const academiaDiplomaManagerContract = new web3.eth.Contract(academiaDiplomaManagerABI, academiaDiplomaManagerAddress);

// lire les id des diplome de l'utilisateur courant
let diplomaIds = null;
academiaDiplomaManagerContract.methods.getDiplomaIds().call({from:myaddress}, function(err, res) {
    console.log(res);
    diplomaIds = res;
});
// recupérer un diplome
let docid = 0;
academiaDiplomaManagerContract.methods.getDiplomaInfo(docid).call({from:myaddress}, function(err, res) {
    console.log(res);
    let diplomaName = res[0];
    let userFirstName = res[1];
    let userLastName = res[2];
});
//créer un diplome (uniqument si validateur)
let dipName = "test";
let fname = "Baptiste";
let lname = "Zegre";
let id = 0
let timestamp = 0
academiaDiplomaManagerContract.methods.uploadDiploma(dipName, fname, lname, id, timestamp).send({from: myaddress}, function(err, res) {
    console.log(res);
});

// ACADEMIA DOCUMENTS
let academiaDocumentManagerJSON = "AcademiaDocumentManager.json";
let academiaDocumentManagerABI = JSON.parse(fs.readFileSync(academiaDocumentManagerJSON));
let academiaDocumentManagerAddress = "0x331f2f1986ec10a199e0603d8478b850e49208fa";
const academiaDocumentManagerContract = new web3.eth.Contract(academiaDocumentManagerABI, academiaDocumentManagerAddress);

//créer un document
let docname = "Test Doc";
let dochash = "12345";
academiaDiplomaManagerContract.methods.createDocument(docname, dochash).send({from: myaddress}, function(err, res) {
    console.log(res);
});

//recuper tous les document de l'utilisateur courrant
let docsids = null;
academiaDiplomaManagerContract.methods.getUserDocId().call({from:myaddress}, function(err, res) {
    docsids = res;
    console.log(res);
});
let docid = docsids[0];
academiaDiplomaManagerContract.methods.getDocInfo(docid).call({from:myaddress}, function(err, res) {
    console.log(res);
    let docname = res[0];
    let dochash = res[1];
});

