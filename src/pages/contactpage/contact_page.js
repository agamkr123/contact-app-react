import React, { Component } from 'react'
import './contact_page.scss';

import { ReactComponent as Bin } from '../../resources/images/svgs/bin.svg';


import { 
    BackgroundComponent,  
    HeaderComponent
} from '../../components';

import singletonService from '../../services/singleton.service.js';


var xmlConverter = require('xml-js');

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            profile : {},
            token : "",
            images : {}
        }
    }

    componentDidMount() {
        const token = singletonService.getToken();
        const profile = singletonService.getProfile();
        //console.log('testing', token, profile);
        if (token) {
            this.setState({
                data : [
                ],
                profile : profile,
                token : token,
                images : {}
            })
            this.fetchContact(token, profile);
        } else {
            this.props.history.push('/home')
        }
    }
    
    fetchContact(token, profile) {
        fetch(`https://content.googleapis.com/m8/feeds/contacts/${profile.email}/full?max-results=100`, {
        "headers": {
            "authorization": `Bearer ${token}`,
        },
        "body": null,
        "method": "GET",
        }).then(async (data) => {
            try {
                const str = await data.text();
                const json = JSON.parse(xmlConverter.xml2json(str, {compact: true}));
                if (json.feed.entry) {
                    const data = json.feed.entry.map(data => {
                        let href = "";
                        if (data.link && Array.isArray(data.link)) {
                            data.link.forEach(element => {
                                if (element._attributes.type && 
                                    element._attributes.type == 'image/*' &&
                                    element._attributes.rel == 'http://schemas.google.com/contacts/2008/rel#photo') {
                                        href = element._attributes.href;
                                }
                            });
                        }
                        //console.log(href, data);
                        if (href) {
                            setTimeout(() => {
                                fetch(href, {
                                    "headers": {
                                        "authorization": `Bearer ${this.state.token}`,
                                    },
                                    "body": null,
                                    "method": "GET",
                                }).then(async dataImage => {
                                    const blob = await dataImage.blob();
                                    //console.log(blob);
                                    this.setState({
                                        images : {
                                            ...this.state.images,
                                            [data.id._text] : URL.createObjectURL(blob)
                                        }
                                    })
                                })
                            },0)
                        }
                        return {
                            name : data.title._text || "",
                            email : data["gd:email"] && data["gd:email"]._attributes ?   data["gd:email"]._attributes.address : "",
                            phoneNo : data["gd:phoneNumber"] ?   data["gd:phoneNumber"]._text : "",
                            link : "https://image.shutterstock.com/image-vector/profile-photo-vector-placeholder-pic-600w-535853263.jpg",
                            id : data.id ? data.id._text : ""
                        }
                    });
                    this.setState({
                        data : data
                    })
                    //console.log(data);
                }
            }catch(e) {console.log(e)}
        });
    }
    
  render() {
    
    const rows = this.state.data.map((data, index) => {
        return (
            <div className="row" key={index}>
                <span className="name">
                    <div className="checkbox" />
                    <img src={this.state.images[data.id] ? this.state.images[data.id] : data.link}
                    onError={(event) => {event.target.src="https://image.shutterstock.com/image-vector/profile-photo-vector-placeholder-pic-600w-535853263.jpg"}} />
                    <div>{data.name.length > 20 ? data.name.substr(0, 20) + '...' : data.name}</div>
                </span>
                <span className="email">{data.email}</span>
                <span className="phone-no">
                    {data.phoneNo} 
                    <Bin className="bin" />
                </span>
            </div>
        );
    })
    return (
        <div className="contactPageWrapper">
            <BackgroundComponent styles={{opacity : ".5"}}/>
            <HeaderComponent 
                name={this.state.profile.name}
                email={this.state.profile.email}
                image={this.state.profile.imageUrl}
                history={this.props.history}
            />
            <div className="content">
                <h2>Contacts<span>({this.state.data.length})</span></h2>
                <div className="table-wrapper">
                    <div className="header">
                        <span>Name</span>
                        <span>Email</span>
                        <span>Phone</span>
                    </div>
                    <div className="body">
                        {rows}
                    </div>
                </div>
            </div>
        </ div>
    )
  }
}
