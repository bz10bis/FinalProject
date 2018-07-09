FROM ethereum/client-go

RUN mkdir -p /root/academia/node
COPY ./genesis.json /root/academia/genesis.json
RUN geth --rpc --datadir /root/academia/node init /root/academia/genesis.json
RUN geth --rpc --rpcport 8546 --port 30304 --rpcaddr  --rpcapi eth,net,web3,personal,clique --datadir /root/academia/node --networkid 15 --mine --bootnodes enode://93d53ab2d8478396ea1ab60aeb92d7099aa6ef7c6b23f588c675ecb7bc608e4226e09308e71e558a66ca0af5f6f910f58d8a62640804be37c95b5de151c20cd3@51.38.189.242:30303  
EXPOSE 30303 
EXPOSE 8545