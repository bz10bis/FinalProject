FROM ethereum/client-go

RUN mkdir -p /root/academia/node
COPY ./genesis.json /root/academia/genesis.json
RUN geth --rpc --datadir /root/academia/node init /root/academia/genesis.json
RUN geth --rpc --rpcport 8545 --port 30303 --rpcaddr 0.0.0.0 --rpcapi eth,net,web3,personal,clique --datadir node1/ --unlock 0x7f9f9246ddf3d51356258598f5ba4d8a607f4f85 --password node1/pass.txt  --networkid15 --mine --rpccorsdomain "*"
EXPOSE 30303 
EXPOSE 8545