import React, { Component } from 'react'
import './home_page.scss';

import { 
    BackgroundComponent
} from '../../components';
import { ReactComponent as GoogleLogo } from '../../resources/images/svgs/image 12.svg';
import { GoogleLogin } from 'react-google-login';


export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.onLoginSuccessHandle = this.onLoginSuccessHandle.bind(this);
        this.onLoginFailureHandle = this.onLoginFailureHandle.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.props.history.push('/contacts');
        }
    }

    onLoginSuccessHandle(user) {
        if (user.accessToken && user.profileObj) {
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('profile', JSON.stringify(user.profileObj))
            this.props.history.push('/contacts');
        }
    }

    onLoginFailureHandle(error) {

    }

    render() {
        return (
            <div className="homePageWrapper">
                <BackgroundComponent/>
                <div className="loginWrapper">
                    <GoogleLogo/>
                    <h2>Sign in with Google</h2>
                    <GoogleLogin
                        clientId="635142790754-m4pd146igpdu45jdte48iji31mnu2pdr.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.onLoginSuccessHandle}
                        onFailure={this.onLoginFailureHandle}
                        cookiePolicy={'single_host_origin'}
                        //isSignedIn={true}
                        scope="email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/contacts.readonly https://www.google.com/m8/feeds/"
                        render={renderProps => (
                            <div
                                onClick={renderProps.onClick} disabled={renderProps.disabled}
                                className="signIn-btn">
                                Sign in
                            </div>
                        )}
                    />
                </div>
            </ div>
        )
    }
}
