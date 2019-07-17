'use strict';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import auth from '../../requests/login';
import { setToken } from '../../store/actions/actions';
import store from '../../store/store';
import config from '../../../config';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: undefined,
            redirecting: false,
        };
    }

    loginSubmit = async e => {
        e.preventDefault();

        let user = e.target.elements.username.value;
        let pass = e.target.elements.password.value;

        if (!user || !pass) {
            this.setState({ error: 'Please enter credentials..' });
            return;
        }

        let { id_token } = await auth(user, pass).catch(error => {
            this.setState({
                error: error.message,
            });
        });

        if (id_token) {
            store.dispatch(setToken(id_token));

            this.setState({ redirecting: true });
        }

        localStorage.setItem(config.tokenIdentifier, id_token);
    };

    render() {
        if (this.state.redirecting) {
            return <Redirect to="/" />;
        }

        return (
            <div className="loginView">
                <form className="loginForm" onSubmit={this.loginSubmit}>
                    <h2>Login</h2>
                    <span>
                        <label>Username:</label>
                        <input
                            className="form-control"
                            type="text"
                            name="username"
                            placeholder="Username"
                            required
                        />
                    </span>
                    <span>
                        <label>Password:</label>
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                        />
                    </span>
                    <button className="btn btn-primary btn-block">
                        Log In
                    </button>
                </form>
            </div>
        );
    }
}

export default Login;
