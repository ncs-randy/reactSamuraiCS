import React, { Component } from "react";
import { Auth } from 'aws-amplify';
import FormErrors from './FormError';
import Validation from './Validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Signup extends Component {
  state = {
    email: "",
    address: "",
    name: "",
    username: "",
    phonenumber: "",
    password: "",
    confirmpassword: "",
    errorMsg: []
  }

  clearErrorState = () => {
    this.setState({
      errorMsg: []
    });
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }

  waitToSignUp = async (bool) => {
    if (bool) {
      // change from amazon-cognito-identity-js to aws-amplify
      // becuase of developer have discontinued developing this library amazon-cognito-identity-js, and bug found when doing token verification
      const { username, password } = this.state;
      try {
        // Added custom:role
        // Driver, Administrator
        await Auth.signUp({
          username,
          password,
          attributes: {
            email: this.state.email,
            address: this.state.address,
            name: this.state.name,
            phone_number: this.state.phonenumber,
            "custom:role": "Driver",
          },
        })
        .then(() => {
          this.props.history.push("/");
        })
      } catch (error) {
        this.setState({ errorMsg : [error.message] });
      }
    }
  }

  onSubmit = async (event) => {
    event.preventDefault();
    this.clearErrorState();
    
    Validation(this.state)
      .then(error => {
        this.setState({ errorMsg: error });
        this.waitToSignUp(error.length === 0);
      })
      .catch(() => this.setState({ errorMsg : ["Something went wrong, please refresh page and try again."] }))
  };
  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Sign Up</h1>
          <p>Sign up to be one of Samurai Courier Service (SCS) driver!</p>
          <FormErrors formerrors={this.state.errorMsg} />

          <form onSubmit={this.onSubmit}>
          <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  value={this.state.name}
                  onChange={(event) => this.onInputChange(event)}
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon= "signature"/>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type="text"
                  id="username"
                  aria-describedby="userNameHelp"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={(event) => this.onInputChange(event)}
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon="user" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input 
                  className="input" 
                  type="text"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={(event) => this.onInputChange(event)}
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon="envelope" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={(event) => this.onInputChange(event)}
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon="lock" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type="password"
                  id="confirmpassword"
                  placeholder="Confirm password"
                  value={this.state.confirmpassword}
                  onChange={(event) => this.onInputChange(event)}
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon="unlock" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type="text"
                  id="address"
                  placeholder="Address"
                  value={this.state.address}
                  onChange={(event) => this.onInputChange(event)}
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon="globe" />
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type="tel"
                  id="phonenumber"
                  placeholder="Phone Number e.g +6587654321"
                  value={this.state.phonenumber}
                  onChange={(event) => this.onInputChange(event)}
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon= "mobile-alt"/>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success">
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default Signup;
