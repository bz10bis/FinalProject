/**
 * Created by Julien on 13/07/2018.
 */

import React, { Component } from 'react';
import './style.css';
import Uploader from '../Uploader';

class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key      : props.id,
            name     : props.name,
            date     : props.date,
            describe : props.describe,
            teatcher : props.teatcher,
            deadline : props.deadline,
            deliverable :props.deliverable
        };
    };

    render() {
        return (
            <Uploader/>
        );
    }
}

export default Project;
