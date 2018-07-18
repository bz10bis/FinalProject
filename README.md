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
cd /root/academia_network/
geth --rpc --rpcport 8545 --port 30303 --rpcaddr 0.0.0.0 --rpcapi eth,net,web3,personal,clique --datadir node1/ --unlock 0x7f9f9246ddf3d51356258598f5ba4d8a607f4f85 --password node1/pass.txt  --networkid15 --mine --rpccorsdomain "*"
```

Pour manager le noeur via systemctl
```
systemctl start geth
systemctl stop geth
systemctl status geth
```

#### Smart contract addresses

* SafeMath: 
* AcademiaToken: 0x5ec7d9ed45ec6374aef2377e1557032c07e0be1b
* AcademiaDocumentManager:
* AcademiaDiplomaManager:
* AcademiaTokenSale:
* AcademiaGroupManager:


### Spark 


### Cherry Py

### React

### Express