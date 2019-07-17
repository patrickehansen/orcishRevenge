'use strict';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import register from '../../requests/register';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: undefined,
      redirecting: false,
      redirect: false,
    };
  }

  submit = async e => {
    e.preventDefault();

    const user = e.target.elements.username.value;
    const pass = e.target.elements.password.value;
    const confirm = e.target.elements.confirm.value;
    const email = e.target.elements.email.value;

    if (confirm !== pass) {
      this.setState({ error: 'Passwords do not match..' });
      return;
    }

    const response = await register(user, email, pass).catch(error => {
      this.setState({
        error: error.message,
      });
    });

    if (response) {
      this.setState({
        redirecting: true
      })

      setTimeout(this.setState, 5 * 1000, {redirect: true})
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="loginView">
        <form className="loginForm" onSubmit={this.submit}>
          <h2>Register</h2>
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
            <label>Email:</label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
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
          <span>
            <label>Confirm:</label>
            <input
              className="form-control"
              type="password"
              name="confirm"
              placeholder="Confirm Password"
              required
            />
          </span>
          <button className="btn btn-primary btn-block">
            Submit
          </button>
        </form>
        {this.state.redirecting && 
          <div className='redirecting'>
            Registration successful. Redirecting to login page...
          </div>
        }
      </div>
    );
  }
}

export default Login;
