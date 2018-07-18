/**
 * Created by Julien on 24/06/2018.
 */
import React, { Component } from 'react';
import './style.css';
import Menu from '../Menu';
import Web3 from 'web3';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const web3 = new Web3(Web3.givenProvider);
web3.eth.getAccounts().then(console.log);
const academiatokenContract = new web3.eth.Contract([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_totalSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}], "0x5ec7d9ed45ec6374aef2377e1557032c07e0be1b");

// const web3 = new Web3(new Web3.providers.HttpProvider('http://51.38.189.242:8545'));

const Projects = [
    { id: 1,
        name     : 'test1',
        date     : '10 aout 2031',
        describe : 'Dont press that little red button you bitch !!',
        teatcher : 'Mr Penible',
        deadline : 'hier',
        deliverable :'none' },
    { id: 2,
        name     : 'test2',
        date     : 'demain',
        describe : 'Primi igitur omnium statuuntur Epigonus et Eusebius ob nominum gentilitatem oppressi. praediximus enim Montium sub ipso vivendi termino his vocabulis appellatos fabricarum culpasse tribunos ut adminicula futurae molitioni pollicitos.',
        teatcher : 'Mme Penible',
        deadline : 'hier',
        deliverable :'none' }
];

const mon_profil = {
    login : 'test',
    pswd  : 'test',
    id : "test",
    name: 'Jean Michel',
    lastname : 'Testouille',
    email : 'test@test.com',
    phone : '0631309308',
    promotion : '5A IBD',
    birth : '28 / 05 / 1993',
    address : '8 rue Lamark, 75012, Paris',
    projects  : Projects,
};

class Auth extends Component {

    constructor(props){
        super(props);

        this.state = {
            login : null,
            pswd  : null,
            valid_auth : false,
            login_status : '',
            pswd_status  : '',
            w3Account : null,
        };
        web3.eth.getAccounts()
            .then( (res) => {
                this.setState({
                    w3Account: res
                });
                return res
            })
            .then( function (res) {
                academiatokenContract.methods.balanceOf('0xd8C44F12611E329044CF47076F95d6079F4A2e64').call({from:'0xd8C44F12611E329044CF47076F95d6079F4A2e64'}, function (err, res2) {
                    console.log(res2);
                });
            }
        );

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLoging = this.handleLoging.bind(this);
    }

    checkW3() {
        if (typeof web3 !== 'undefined') {
            return (
            <div className="alert alert-success">
                <div>
                    <i className="fas fa-check-circle"> </i> Compte MetaMask connecté : {this.state.w3Account}
                </div>
            </div>
            )
        } else {
            return(
                <div className="alert alert-warning">
                    <div>
                        <i className="fas fa-exclamation-triangle"> </i>Impossible d'établir le contact avec la blockchain
                    </div>
                </div>
            );
        }
    }

    handleLoginChange(event){
        this.setState({
            login : event.target.value
        })
    }

    handlePasswordChange(event){
        this.setState({
            pswd : event.target.value
        })
    }

    handleLoging(){
        if(this.state.login === mon_profil.login && this.state.pswd === mon_profil.pswd) {
            this.setState({
                valid_auth : true
            })
        } else {
            if(this.state.login === mon_profil.login) this.setState.login_status = 'invalid login';
            if(this.state.pswd === mon_profil.pswd) this.setState.pswd_status = 'invalid pswd';
        }
    }

    render() {
        if (this.state.valid_auth && this.state.w3Account !== null) {
            console.log('log valid');
            return (
                <Menu />
            )
        }
        else {
            return (
                <div className="container">
                    {this.checkW3()}
                    <div className="card card-container">
                        <p id="profile-name" className="profile-name-card"><i className="fas fa-user-circle"
                                                                              style={{fontSize: '150px'}}> </i></p>
                        <form className="form-signin">

                            <input type="login" id="inputLogin" className="form-control" placeholder="Login" required
                                   onChange={this.handleLoginChange}/>
                            <span id="id_login_status" className="login_status">{this.state.login_status}</span>

                            <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                                   required onChange={this.handlePasswordChange}/>
                            <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit" onClick={this.handleLoging}>Sign in
                            </button>
                        </form>
                    </div>
                </div>
            )
        }
    };
}

export default Auth;