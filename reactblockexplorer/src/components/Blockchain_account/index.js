import React, { Component } from 'react';
import './style.css';
import Web3 from 'web3';
import BlockchainFiles from "../BlockchainFiles/index";

class Blockchain_account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            block_ids: [],
            block_hashes: [],
            curr_block: null,
            curr_account: null
        }
    }

    componentWillMount() {
        let curr_block_no;
        let curr_account_addr;
        web3.eth.getAccounts().then((accounts) => {
            return accounts[0];
        }).then((account) => {
            curr_account_addr = account;
            web3.eth.getBlockNumber().then((blockNumber) => {
                curr_block_no = blockNumber;
                this.setState({
                    curr_account: curr_account_addr,
                    curr_block: curr_block_no
                });
                return curr_block_no
            }).then((curr_block_no) => {
                this.getBlocks(curr_block_no);
            });
        });
    }

    getBlocks(curr_block_no) {
        const block_ids = this.state.block_ids.slice();
        const block_hashes = this.state.block_hashes.slice();
        let max_blocks = 10;
        if (curr_block_no < max_blocks) {
            max_blocks = curr_block_no;
        }
        for(let i = 0; i <= max_blocks; i++, curr_block_no--) {
            let currBlockObject;
            web3.eth.getBlock(curr_block_no).then((res) => {
                currBlockObject = res;
            }).then(() => {
                block_ids.push(currBlockObject.number);
                block_hashes.push(currBlockObject.hash);
            });
        }
        this.setState({
            block_ids: block_ids,
            block_hashes: block_hashes
        });
    }

    render() {
        console.log("Block hashes");
        console.log(this.state.block_hashes);
        console.log("Length: " + this.state.block_hashes.length);

        return (
                <div className="Blockchain_account">
                    Current account: {this.state.curr_account}
                    {/*Current block: {this.state.curr_block}*/}
                </div>
        );
    }
}

export default Blockchain_account;