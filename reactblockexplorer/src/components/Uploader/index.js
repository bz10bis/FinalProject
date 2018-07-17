/**
 * Created by Julien on 02/07/2018.
 */

import React, { Component } from 'react';
import './style.css';
import axios, { post } from 'axios';

class Uploader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadStatus: false,
            id : 'uploader_' + props.id,
            projects : props.projects,
            url: 'https://localhost:3001/upload',
            file: null,
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.fileSelected = this.fileSelected.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    }
    fileSelected(e) {
        this.setState({file:e.target.files[0]});
    }

    onFormSubmit(e){
        e.preventDefault(); // Stop form submit
        this.fileUpload(this.state.file);
    }

    fileUpload(file){
        console.log(this.state.file);
        const url = 'http://localhost:3001/upload';
        const formData = new FormData();
        formData.append('file',file);
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(url, formData,config);
    }

    getStatus(){
        
    }

render() {
        return (
            <div id={this.state.id} className="Uploader col-md-12 col-sx-12 col-sm-12">
                <div className="form-group row col-md-12">
                    <p>My projects</p>
                    <select className="form-control " id="selector">
                        {
                            this.state.projects.map(function(project) {
                                return <option key={project.id}
                                               value={project.name}>{project.name}</option>;
                            })
                        }
                    </select>
                </div>

                <div className="row col-md-12">
                    <form onSubmit={this.onFormSubmit}>
                        <h1>File Upload</h1>
                        <input type="file" onChange={this.fileSelected} />
                        <button type="submit">Upload</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Uploader;
