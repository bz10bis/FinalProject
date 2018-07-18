### Status
[![Build Status](https://travis-ci.org/bz10bis/FinalProject.svg?branch=master)](https://travis-ci.org/bz10bis/FinalProject.svg?branch=master)

# FinalProject
Repository of our final project 

## Contributeurs
Baptiste Zegre
Julien Sarrazin 
Gerome Cabezas

## Structure

### Blockchain
Contient toutes les ressources relatives a la blockchain privée ETH incluant les SmartContracts les test et les commandes 


Pour lancer le noeud academia manuellement:

```
cd /root/nodeAcademia/
geth --rpc --rpcport 8545 --port 30303 --rpcaddr 0.0.0.0 --rpcapi eth,net,web3,personal,
clique --datadir node/ --unlock 0x5c8711c24ea9220fea3c3cb9e994911adfce4bdf --networkid 15 --mine --rpccorsdomain "*" --password passfile
```

Pour manager le noeur via systemctl
```
systemctl start geth
systemctl stop geth
systemctl status geth
```

#### Smart contract addresses

* SafeMath: ```0x9c9b6fb30c26904abcc11492a88eaa91bed2e3de```
* AcademiaToken: ```0x05a3d2e93d1fbe34517c6080af16505436c1e7be```
* AcademiaDocumentStorageManager: ```0x331f2f1986ec10a199e0603d8478b850e49208fa```
* AcademiaDiplomaManager:```0x6c3597558366b3ac76f660c57e495c95d993182b```
* AcademiaTokenSale:```
* AcademiaGroupManager:```


### Spark 


### Cherry Py

### React

### Express