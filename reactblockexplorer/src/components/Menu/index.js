/**
 * Created by Julien on 17/07/2018.
 */
import React, { Component } from 'react';
import logo from '../Menu/logo.svg';
import './style.css';
import Profil from "../Profil";
import Home from "../Home";
import File from '../File';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

const files = [
        {
            name: 'MemoireESGI.pdf',
        },
        {
            name: 'MSBI_Sequencage.pdf'
        }
    ];

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : files.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (suggestion.name);


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            validFile: false,
            suggestions: []
        };
        this.renderFile = this.renderFile.bind(this);
    }

    renderFile(){
        if(this.state.validFile) {
            return(
                <div>
                    <File {...this.state}/>
                </div>
            )
        }
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });

        if(newValue.indexOf('.') !== -1){
            this.setState( {
                validFile : true
            });
        }
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {

        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: ' Search for my files',
            value,
            onChange: this.onChange
        };

        return (
            <div className='App'>

                <div className='App-header'>

                    <h2>My Academia</h2>

                    <nav className="navbar navbar-default" key={1}>
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
                                        {/*<AutoSuggestInput />*/}
                                        <Autosuggest
                                            suggestions={suggestions}
                                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                            getSuggestionValue={getSuggestionValue}
                                            renderSuggestion={renderSuggestion}
                                            inputProps={inputProps}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>

                <div>{this.renderFile()}</div>

                <BrowserRouter>
                    <Switch>
                        <Route path="/Profil" component={Profil}/>
                        <Route path="/Home" component={Home}/>
                        <Route path='/File' component={File}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default Menu;