/**
 * Created by Julien on 02/07/2018.
 */

import React, { Component } from 'react';
import './style.css';

class Uploader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: 'https://webhook.site/329f4670-8d80-4df0-b65a-709690676184',
            files: '',
            filesWereDropped: '',
            upload_bar: 30,
            upload_status: {visibility : 'hidden'},
            loading: {width : '0%'}
        }
    };



render() {
        return (
            <div className="Uploader container">
                <div className="panel panel-default">
                    <div className="panel-heading"><strong>Upload Files</strong></div>
                    <div className="panel-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <h4>Select files from your computer</h4>
                                    <form action="" method="post" encType="multipart/form-data" id="js-upload-form">
                                        <div className="form-inline">
                                            <div className="form-group">
                                                <input type="file" name="files[]" id="js-upload-files" multiple/>
                                            </div>
                                            <button type="submit" className="btn btn-sm btn-primary" id="js-upload-submit">Upload files</button>
                                        </div>
                                    </form>
                                </div>
                                <br/>
                            </div>
                        </div>
                        <br/>
                        <div className="progress">
                            <div className="progress-bar my-progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={this.state.upload_bar} style={this.state.loading}>
                                <span className="sr-only">{this.state.upload_bar}% Complete</span>
                            </div>
                        </div>

                        <div className="js-upload-finished" style={this.state.upload_status}>
                            <h3>Processed files</h3>
                            <div className="list-group">
                                <a href="#" className="list-group-item list-group-item-success"><span className="badge alert-success pull-right">Success</span>{this.state.file}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Uploader;
