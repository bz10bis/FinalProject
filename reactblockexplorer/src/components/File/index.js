/**
 * Created by Julien on 17/07/2018.
 */
import React, {Component} from 'react';
import './style.css';
import MyPdfViewer from './MyPdfViewer';

class File extends Component{
    constructor(props){
        super(props);
        this.state = {
            filename : props.value,
            filedir  : 'http://51.38.189.242:3001/'
        };
        console.log(props);
    }

    render(){
        return(
            <div className="File container form-group">
                <MyPdfViewer {...this.state}/>
            </div>
        )
    }
}

export default File;