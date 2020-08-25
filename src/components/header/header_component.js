import React, { Component } from 'react'

import './header_component.scss';


import { ReactComponent as Ellipese49 } from '../../resources/images/svgs/Ellipse 49.svg';
import { ReactComponent as Ellipese50 } from '../../resources/images/svgs/Ellipse 50.svg';
import { ReactComponent as LogoutShape } from '../../resources/images/svgs/Shape.svg';
import { ReactComponent as LogoutShape2 } from '../../resources/images/svgs/Shape2.svg';
import { ReactComponent as LogoutShape3 } from '../../resources/images/svgs/Shape3.svg';

export default class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.onLogoutSuccessHandler = this.onLogoutSuccessHandler.bind(this)
    }

    onLogoutSuccessHandler() {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        this.props.history.push('/home');
    }

  render() {
    return (
        <div className="header-wrapper">
            <div>
                <Ellipese50 className="ellipese50" />
                <Ellipese49 className="ellipese49" />
            </div>
            <div className="profile">
                <div>
                    <img 
                        src={this.props.image}
                    />
                </div>
                <div className="nameDiv">
                    <p className="name">{this.props.name}</p>
                    <p className="email">{this.props.email}</p>
                </div>
                <div className="logout-btn"
                onClick={this.onLogoutSuccessHandler}
                >
                    <LogoutShape2 className="shape2"/>
                    <LogoutShape3 className="shape3"/>
                    <LogoutShape className="shape"/>
                </div>
            </div>
        </div>
    )
  }
}
