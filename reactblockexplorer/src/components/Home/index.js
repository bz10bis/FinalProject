/**
 * Created by Julien on 16/07/2018.
 */
import React, { Component } from 'react';
import './style.css';
import BlockchainFiles from "../BlockchainFiles/index";

class Home extends Component {

    render() {
        return(
            <BlockchainFiles {...this.props}/>
        )
    }
}

export default Home;