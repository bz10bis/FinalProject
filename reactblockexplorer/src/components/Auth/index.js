/**
 * Created by Julien on 24/06/2018.
 */
import React, { Component } from 'react';
import './style.css';
class Auth extends Component {
    render() {
        return (



            <div className='App'>
                <div className='App-header'>
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Block Explorer</h2>
                </div>
                <div className='App-nav'>
                    <Router>
                        <div>
                            <Link to="/">Home</Link>
                            <Link to="/block">Block</Link>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/block" render={() => (
                                <h3>Please select a blockHash</h3>
                            )}/>
                            <Route path="/block/:blockHash" component={Block}/>
                        </div>
                    </Router>
                </div>
            </div>



        );
    }
}

export default Auth;