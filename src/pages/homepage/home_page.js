import React, { Component } from 'react'
import './home_page.scss';

import BackgroundComponent from '../../components/background/background_compoenent';
import { ReactComponent as GoogleLogo } from '../../resources/images/svgs/image 12.svg';


export default class HomePage extends Component {
  render() {
    return (
        <div className="homePageWrapper">
            <BackgroundComponent/>
            <div className="loginWrapper">
                <GoogleLogo/>
                <h2>Sign in with Google</h2>
                <div className="signIn-btn">
                    Sign in
                </div>
            </div>
        </ div>
    )
  }
}
