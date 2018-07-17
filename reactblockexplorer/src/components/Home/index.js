/**
 * Created by Julien on 16/07/2018.
 */
import React, { Component } from 'react';
import './style.css';
import Web3 from 'web3';
import BlockchainFiles from "../BlockchainFiles/index";

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

class Home extends Component {

    render() {
        return(
            <BlockchainFiles {...this.props}/>
        )
    }
}

export default Home;