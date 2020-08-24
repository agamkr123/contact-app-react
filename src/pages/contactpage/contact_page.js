import React, { Component } from 'react'
import './contact_page.scss';

import { ReactComponent as Bin } from '../../resources/images/svgs/bin.svg';


import { 
    BackgroundComponent,  
    HeaderComponent
} from '../../components';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {
                    name : "Agam kumar",
                    email : "agamkrbit@gmail.com",
                    phoneNo : "+918252117480",
                    link : "https://image.shutterstock.com/image-vector/profile-photo-vector-placeholder-pic-600w-535853263.jpg"
                },
                {
                    name : "Agam kumar",
                    email : "agamkrbit@gmail.com",
                    phoneNo : "+918252117480",
                    link : "https://image.shutterstock.com/image-vector/profile-photo-vector-placeholder-pic-600w-535853263.jpg"
                },
                {
                    name : "Agam kumar",
                    email : "agamkrbit@gmail.com",
                    phoneNo : "+918252117480",
                    link : "https://image.shutterstock.com/image-vector/profile-photo-vector-placeholder-pic-600w-535853263.jpg"
                }
            ]
        }
    }  
  render() {
    
    const rows = this.state.data.map((data, index) => {
        return (
            <div className="row" key={index}>
                <span className="name">
                    <div className="checkbox" />
                    <img src={data.link} />
                    <div>{data.name}</div>
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
            <HeaderComponent />
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
