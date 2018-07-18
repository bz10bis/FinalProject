/**
 * Created by Julien on 13/07/2018.
 */

import React, { Component } from 'react';
import './style.css';
import Project_preview from '../Project_preview'

class Projects_list extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    };

    render() {
        return (
            <div className="container">
                <div className="list-group">
                    <div className="project_list_header">My Projects</div>
                    <div>
                        {this.props.projects.map(c => <Project_preview key={c.id} id={c.id} name={c.name} date={c.date} describe={c.describe} teatcher={c.teatcher} deadline={c.deadline} deliverable={c.deliverable} status="Details"/>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Projects_list;
