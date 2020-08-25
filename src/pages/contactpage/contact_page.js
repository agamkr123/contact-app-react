import React, { Component } from 'react'
import './contact_page.scss';

import { ReactComponent as Bin } from '../../resources/images/svgs/bin.svg';


import { 
    BackgroundComponent,  
    HeaderComponent
} from '../../components';

var xmlConverter = require('xml-js');

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        const token = localStorage.getItem('token') || "";
        const profile = localStorage.getItem('profile') || "";
        if (token && profile) {
            const profileObj = JSON.parse(profile);
            this.state = {
                data : [
                ],
                profile : profileObj,
                token : token,
                images : {}
            }
        } else {
            this.props.history.push('/home');
            this.state = {
                data : [],
                profile : {},
                token : "",
                images : {}
            }
        }
    }

    componentDidMount() {
        this.fetchContact();
    }
    
    fetchContact() {
        fetch(`https://content.googleapis.com/m8/feeds/contacts/${this.state.profile.email}/full?max-results=100`, {
        "headers": {
            "authorization": `Bearer ${this.state.token}`,
        },
        "body": null,
        "method": "GET",
        }).then(async (data) => {
            try {
                const str = await data.text();
                const json = JSON.parse(xmlConverter.xml2json(str, {compact: true}));
                if (json.feed.entry) {
                    const data = json.feed.entry.map(data => {
                        console.log(data)
                        if (data.link[1]) {
                            fetch(data.link[1]._attributes.href, {
                                "headers": {
                                    "authorization": `Bearer ${this.state.token}`,
                                },
                                "body": null,
                                "method": "GET",
                            }).then(async dataImage => {
                                const blob = await dataImage.blob();
                                console.log(blob);
                                this.setState({
                                    images : {
                                        ...this.state.images,
                                        [data["gd:email"]._attributes.address] : URL.createObjectURL(blob)
                                    }
                                })
                            })
                        }
                        return {
                            name : data.title._text || "",
                            email : data["gd:email"] ?   data["gd:email"]._attributes.address : "",
                            phoneNo : data["gd:phoneNumber"] ?   data["gd:phoneNumber"]._attributes.address : "",
                            link : "https://image.shutterstock.com/image-vector/profile-photo-vector-placeholder-pic-600w-535853263.jpg"
                        }
                    });
                    this.setState({
                        data : data
                    })
                    console.log(data);
                }
            }catch(e) {}
        });
    }
    
  render() {
    
    const rows = this.state.data.map((data, index) => {
        return (
            <div className="row" key={index}>
                <span className="name">
                    <div className="checkbox" />
                    <img src={this.state.images[data.email] ? this.state.images[data.email] : data.link}
                    onError={(event) => {event.target.src="https://image.shutterstock.com/image-vector/profile-photo-vector-placeholder-pic-600w-535853263.jpg"}} />
                    <div>{data.name.length > 10 ? data.name.substr(0, 10) + '...' : data.name}</div>
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
