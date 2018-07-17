/**
 * Created by Julien on 14/07/2018.
 */

import React, { Component } from 'react';
import './style.css';
//import {BrowserRouter, Route, Link} from 'react-router-dom';
import Project from '../Project'

class Project_preview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key      : props.id,
            name     : props.name,
            date     : props.date,
            describe : props.describe,
            teatcher : props.teatcher,
            deadline : props.deadline,
            deliverable :props.deliverable,
            status   : props.status,
            repo     : props.repo
        };
        console.log(this.state);
    };

    project_details = (props) => {
        if(this.state.status === "Hide"){
            this.setState({
                status: 'Details'
            });
            return (
                <div>

                </div>
            )
        }
        if(this.state.status === "Details") {
            this.setState({
                status: 'Hide'
            });
            return (
                <Project  {...props}/>
            )
        }
    };

    render() {
            return (
                <div className="list-group-item list-group-item-action flex-column">
                    <div className="preview">
                        <div id="id_title" className="row">
                            <div className="col-md-6 col-sx-4">
                                <h3 className="mb-1">Title : {this.state.name}</h3>
                            </div>
                            <div id="id_icones" className="col-md-6 col-sx-4">
                                <i className="fas fa-info-circle"> </i>
                                <i className="fas fa-download"> </i>
                            </div>
                        </div>

                        <br/>
                        <p><i className="fas fa-user-graduate"> </i>  Advisor : {this.state.teatcher}</p>
                        <p><i className="far fa-calendar-alt"> </i>  Assignement date : {this.state.date}</p>
                        <p><i className="far fa-calendar-alt"> </i>  Due date : {this.state.date}</p>
                        <p className="mb-1"><i className="fas fa-search"> </i>  Description : {this.state.describe}</p>
                        <p className="mb-1"><i className="fas fa-code-branch"> </i> Repository : {this.state.repo}</p>
                    </div>


                    {/*<BrowserRouter>*/}
                        {/*<div>*/}
                            {/*<Route path="/Project" render={()=><Project  name={this.props.name} date={this.props.date} describe={this.props.describe} teatcher={this.props.teatcher} deadline={this.props.deadline} deliverable={this.props.deliverable}/>}/>*/}
                            {/*<Route exact path="/Project" key={this.state.id} render={this.project_details}/>*/}
                            {/*<Link to="/Project"><i className="fas fa-caret-square-down"> </i></Link>*/}
                        {/*</div>*/}
                    {/*</BrowserRouter>*/}


                </div>
            );
        }
    }

export default Project_preview;
