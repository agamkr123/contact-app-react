import React, { Component } from 'react'

import './header_component.scss';


import { ReactComponent as Ellipese49 } from '../../resources/images/svgs/Ellipse 49.svg';
import { ReactComponent as Ellipese50 } from '../../resources/images/svgs/Ellipse 50.svg';
import { ReactComponent as LogoutShape } from '../../resources/images/svgs/Shape.svg';
import { ReactComponent as LogoutShape2 } from '../../resources/images/svgs/Shape2.svg';
import { ReactComponent as LogoutShape3 } from '../../resources/images/svgs/Shape3.svg';

export default class HeaderComponent extends Component {
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
                        src="https://image.shutterstock.com/image-vector/profile-photo-vector-placeholder-pic-600w-535853263.jpg"
                    />
                </div>
                <div className="nameDiv">
                    <p className="name">Agam Kumar</p>
                    <p className="email">agam.kumar@gmail.com</p>
                </div>
                <div className="logout-btn">
                    <LogoutShape2 className="shape2"/>
                    <LogoutShape3 className="shape3"/>
                    <LogoutShape className="shape"/>
                </div>
            </div>
        </div>
    )
  }
}
