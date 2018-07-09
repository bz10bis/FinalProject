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
geth --rpc --rpcport 8545 --port 30303 --rpcaddr 0.0.0.0 --rpcapi eth,net,web3,personal,clique --data
dir ~/academia/node/ --unlock 0x86561ff176b503000d91c0893384df2d2f7db76d --networkid 15 --mine
```