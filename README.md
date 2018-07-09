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

pour lancer le premier noeud
```
geth --rpc --rpcport 8545 --port 30303 --rpcaddr 0.0.0.0 --rpcapi eth,net,web3,personal,clique --datadir ~/academia/node/ --unlock 0x86561ff176b503000d91c0893384df2d2f7db76d --networkid 15 --mine --rpccorsdomain "http://localhost:8000"


> admin.nodeInfo.enode
"enode://93d53ab2d8478396ea1ab60aeb92d7099aa6ef7c6b23f588c675ecb7bc608e4226e09308e71e558a66ca0af5f6f910f58d8a62640804be37c95b5de151c20cd3@[::]:30303"
```