/**
 * Created by Julien on 02/07/2018.
 */

import React, { Component } from 'react';
import './style.css';
import axios from 'axios';

class Uploader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadStatus: false,
            id : 'uploader_' + props.id,
            projects : props.projects,
            url: 'http://51.38.189.242:3001/upload',
            progress : 0,
            progress_status : '',
            file: null,
            token: null
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

    updateProgressBar(){

    }

    fileUpload(file){
        console.log(this.state.file);
        const url = this.state.url;
        const formData = new FormData();
        formData.append('file',file);
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(url, formData,config)
            .then( (res) => {
                console.log(res);
                axios.post("http://51.38.189.242:8000/upload/?file="+this.state.file.name, {} , {
                    headers: { 'Access-Control-Allow-Origin': '*'}
                }).then(res => {
                    console.log(res);
                })
            })
    }

    watchProcess(data) {
        while(data.LDA === 'pending'){
            axios.post("http://51.38.189.242:8000/list_tokens/?token="+this.state.token, {} , {
                headers: { 'Access-Control-Allow-Origin': '*'}
            }).then(res => {
                console.log(res);
            })
        }
    }

    getStatus(){

    }

render() {
        return (
            <div id={this.state.id} className="Uploader container col-md-12 col-sx-12 col-sm-12">
                <div className="form-group row col-md-12 col-sx-12 col-sm-12">
                    <h1>Select a Project</h1>
                    <select className="form-control " id="selector">
                        {
                            this.state.projects.map(function(project) {
                                return <option key={project.id}
                                               value={project.name}>{project.name}</option>;
                            })
                        }
                    </select>
                </div>

                <div className="row col-md-12 col-sx-12 col-sm-12">
                    <form onSubmit={this.onFormSubmit}>
                        <span className="btn btn-default btn-file">Browse ...<input type="file" onChange={this.fileSelected}/></span>
                        <button type="submit" className="btn btn-dark"> <i className="fas fa-upload"> </i></button>
                    </form>
                </div>


                <div className="row progress col-md-12 col-sx-12 col-sm-12">
                    <div className="progress-bar" role="progressbar" aria-valuenow={this.state.progress} aria-valuemin="0" aria-valuemax="100" style={{width: this.state.progress+'%'}}>
                        <span className="">{this.state.progress_status}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Uploader;
