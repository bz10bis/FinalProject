import React, { Component } from 'react';
import Project_list from '../Projects_list'
import './style.css';
import Uploader from "../Uploader/index";
import $ from 'jquery';

const Projects = [
    { id: 1,
        name     : 'test1',
        date     : '10 aout 2031',
        describe : 'Dont press that little red button you bitch !!',
        teatcher : 'Mr Penible',
        deadline : 'hier',
        deliverable :'none' },
    { id: 2,
        name     : 'test2',
        date     : 'demain',
        describe : 'Primi igitur omnium statuuntur Epigonus et Eusebius ob nominum gentilitatem oppressi. praediximus enim Montium sub ipso vivendi termino his vocabulis appellatos fabricarum culpasse tribunos ut adminicula futurae molitioni pollicitos.',
        teatcher : 'Mme Penible',
        deadline : 'hier',
        deliverable :'none' }
];

const mon_profil = {
    id : "test",
    name: 'Jean Michel',
    lastname : 'Testouille',
    email : 'test@test.com',
    phone : '0631309308',
    promotion : '5A IBD',
    birth : '28 / 05 / 1993',
    address : '8 rue Lamark, 75012, Paris',
    projects  : Projects,
};

class Profil extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valid_auth : props.valid_auth,
            id : mon_profil.id,
            name: mon_profil.name,
            lastname : mon_profil.lastname,
            address  : mon_profil.address,
            email : mon_profil.email,
            phone : mon_profil.phone,
            birth : mon_profil.birth,
            promotion : mon_profil.promotion,
            projects  : mon_profil.projects,
        };

        // $.ajax({
        //     url: '',
        //     dataType: 'jsonp',
        //     success: function(data) {
        //         console.log(data);
        //         this.setState({
        //         });
        //     }.bind(this),
        //     error: function(xhr, status, err) {
        //         console.error(this.props.url, status, err.toString());
        //     }.bind(this)
        // });
    }

    render() {
        return (
        <div>
            <div className="container">
                <div className="row col-md-6">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="well well-sm">
                            <div className="row Profil">
                                <div className="col-sm-12 col-md-12">
                                    <i className="fas fa-user-circle" style={{fontSize : '200px'}}> </i>
                                </div>

                                <div className="infos col-sm-12 col-md-12">
                                    <h4>{this.state.name} {this.state.lastname}</h4>
                                    <p><i className="fas fa-home"> </i>  <cite title="Address">{this.state.address}</cite></p>

                                    <p><i className="fas fa-at"> </i>  <a href="Email">{this.state.email}</a></p>

                                    <p><i className="fas fa-birthday-cake"> </i> {this.state.birth}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row col-md-6">
                    <Uploader {...this.state}/>
                </div>

            </div>

            <Project_list projects={this.state.projects}/>
        </div>
        );
    }
}

export default Profil;