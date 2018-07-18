import React, { Component } from 'react';
import './style.css';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);

class Diploma extends Component {
    constructor(props){
        super(props);
        this.state = {
            account = null,
            documents = null
        };
        web3.eth.getAccounts()
            .then( (res) => {
                this.setState({
                    account: res
                });
                return res
            })
            .then( function (res) {
                academiatokenContract.methods.balanceOf('0xd8C44F12611E329044CF47076F95d6079F4A2e64').call({from:'0xd8C44F12611E329044CF47076F95d6079F4A2e64'}, function (err, res2) {
                    console.log(res2);
                });
            }
        );
    }
    
    render() {
        return(
            <div class="container">
                <p>Mon compte: </p>
            </div>
        )
    }
}

export default Diploma;