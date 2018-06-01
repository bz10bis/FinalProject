#!/bin/bash

set -e 
cd blockchain/
ganache-cli 2> /dev/null 1> /dev/null &
sleep 5
rm -rf build/
truffle compile
truffle migrate --reset --network development
truffle test
kill -9 $(lsof -t -i:8545)