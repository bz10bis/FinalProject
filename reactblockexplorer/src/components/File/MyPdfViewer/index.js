/**
 * Created by Julien on 18/07/2018.
 */

import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';

class MyPdfViewer extends Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            filename : props.filedir+ props.filename,
            numPages: null,
            pageNumber: 1,
        };
        console.log(this.state.filename);
    }

    loading_render() {
        return(
            <div className="container col-md-12"><i className="fas fa-circle-notch fa-spin"> </i></div>
        )
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    render() {
        const { pageNumber, numPages } = this.state;

        return (
            <div className="row container document form-group col-md-12">
                <Document className="row" width="300px"
                    file={this.state.filename} onLoadSuccess={this.onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} loading={this.loading_render()} />
                </Document>


            </div>
        );
    }
}

export default MyPdfViewer;