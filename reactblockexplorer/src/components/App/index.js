import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';
import Profil from "../Profil";
import Home from "../Home";
import Blockchain_account from '../Blockchain_account';
import BlockchainFiles from "../BlockchainFiles/index";

import {BrowserRouter, Route, Switch} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div className='App'>

                <div className='App-header'>

                    <h2>My Academia</h2>

                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <a className="navbar-brand"><img src={logo} width={30} height={30} className="App-logo" alt="logo"/></a>
                            </div>

                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul className="nav navbar-nav">
                                    <li className="home">
                                        <a href="/Home">Home</a>
                                    </li>

                                    <li className="profil">
                                        <a href="/Profil"><i className="fa fa-men"/>Mon profil</a>
                                    </li>
                                </ul>

                                <form className="navbar-form navbar-left">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Search"/>
                                    </div>
                                    <button type="submit" className="btn btn-default"><i className="fa fa-search"/></button>
                                </form>

                                <div className="dropdown navbar-form navbar-right">
                                    <Blockchain_account />
                                </div>

                            </div>
                        </div>
                    </nav>
                </div>



                <BrowserRouter>
                    <Switch>
                        <Route path="/Profil" component={Profil}/>
                        <Route path="/Home" component={Home}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;