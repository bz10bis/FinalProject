/**
 * Created by Julien on 17/07/2018.
 */
import React, {Component} from 'react';
import './style.css';

class File extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <Row>
                <Col s={12}>
                    <Chip>
                        <img src='profil_pic.jpg' alt='Contact Person' />
                        Jane Doe
                    </Chip>
                    <Tag>tag</Tag>
                </Col>
            </Row>
        )
    }
}

export default File;