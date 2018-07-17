/**
 * Created by Julien on 16/07/2018.
 */
import React, { Component } from 'react';
import './style.css';
import Web3 from 'web3';

class BlockchainFiles extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    };



    render() {
        return(
            <div className="container">
                <div className="list-group">
                    <div className="blockchainFiles_header">Blockchain Files <i className="fas fa-cubes"> </i></div>
                    <div>
                        {/*{this.props.projects.map(c => <Project_preview id={c.id} name={c.name} date={c.date} describe={c.describe} teatcher={c.teatcher} deadline={c.deadline} deliverable={c.deliverable} status="Details"/>)}*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default BlockchainFiles;