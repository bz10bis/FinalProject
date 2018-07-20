#!/bin/bash

# On lance le noeud principale de notre blockchain 
nohup /usr/bin/geth --rpc --rpcport 8545 --port 30303 --rpcaddr 0.0.0.0 --rpcapi eth,net,web3,personal,clique --datadir /root/nodeAcademia/node/ --unlock 0x5c8711c24ea9220fea3c3cb9e994911adfce4bdf --networkid 15 --mine --rpccorsdomain "*" --password /root/nodeAcademia/passfile & > nohup_masternode.log

# On lance le deuxieme noeud qui se connecte au noeud initial
nohup /usr/bin/geth --rpc --rpcport 8548 --port 30306 --rpcaddr 0.0.0.0 --rpcapi eth,net,web3,personal,clique --datadir /root/nodeAcademia/childnode/ --unlock 0xc8c350bf26029843e1e18cc0ffc5c37cffab80e0 --rpccorsdomain "*" c --bootnodes enode://b4662b09267076de2363201a3fd8df8fa7bb9653ae2578a916f8ecdd5682de43965a8df526b99010c9cc0827374675f933f159b0d5698ff7cf1cdec59e24e769@127.0.0.1:30303 & > nohup_childnode.log

# On lance l'interface de visualisation de l'etats des noeuds sur le port 3006
nohup PORT=3006 WS_SECRET=baptiste node /root/nodeAcademia/eth-netstats/index.js

# On lance les deux inspecteurs de noeuds
pm2 start /root/nodeAcademia/eth-net-intelligence-api/app.json
pm2 start /root/nodeAcademia/eth-net-intelligence-api/app2.json



