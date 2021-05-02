import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Auth } from "aws-amplify";

class Signup extends Component {
  state = {
    email: "",
    address: "",
    name: "",
    username: "",
    phonenumber: "",
    password: "",
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
    //document.getElementById(event.target.id).classList.remove("is-danger");
  };

  onSubmit = async (event) => {
    event.preventDefault();

    // change from amazon-cognito-identity-js to aws-amplify
    // becuase of developer have discontinued developing this library amazon-cognito-identity-js, and bug found when doing token verification
    const { username, password } = this.state;
    try {
      // Added custom:role
      // Driver, Administrator
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          email: this.state.email,
          address: this.state.address,
          name: this.state.name,
          phone_number: this.state.phonenumber,
          "custom:role": "Driver",
        },
      });
      console.log(signUpResponse);
      this.props.history.push("/");
      alert("Sign Up Successful! ");
    } catch (error) {
      console.log(error);
      alert("We encountered some error please try again ");
    }
  };
  render() {
    return (
      <section className="section auth">
        <div className="container">
          <form onSubmit={this.onSubmit}>
            <h1>
              <b>Sign Up</b>
            </h1>
            <p>Sign up to be one of Samurai Courier Service (SCS) driver!</p>
            
            <div className="field">
              {/* <span><label className="signUp" htmlFor="username">Username:</label></span> */}
              <p className="control has-icons-left">
                <input
                  id="username"
                  className="input"
                  value={this.state.username}
                  placeholder="Username"
                  onChange={(event) => this.onInputChange(event)}
                ></input>
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon="user" />
                </span>
              </p>
            </div>
            <div className="field">
              {/* <span ><label className="signUp" htmlFor="email">Email:</label></span> */}
              <p className="control has-icons-left">
                <input
                  id="email"
                  className="input"
                  value={this.state.email}
                  placeholder="Email"
                  onChange={(event) => this.onInputChange(event)}
                ></input>
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon= "envelope"/>
                </span>
              </p>
            </div>
            <div className="field">
              {/* <span><label className="signUp" htmlFor="password">Password:</label></span> */}
              <p className="control has-icons-left">
                <input
                  id="password"
                  className="input"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={(event) => this.onInputChange(event)}
                ></input>
                  <span className="icon is-small is-left">
                  <FontAwesomeIcon icon= "lock"/>
                </span>
              </p>
            </div>
            <div className="field">
              {/* <span ><label className="signUp" htmlFor="address">Address:</label></span> */}
              <p className="control has-icons-left">
                <input
                  id="address"
                  className="input"
                  value={this.state.address}
                  placeholder="Address"
                  onChange={(event) => this.onInputChange(event)}
                ></input>
                  <span className="icon is-small is-left">
                  <FontAwesomeIcon icon= "address-book"/>
                </span>
              </p>
            </div>
            <div className="field">
              {/* <span> <label className="signUp" htmlFor="phonenumber">Phonenumber:</label> </span> */}
              <p className="control has-icons-left">
                <input
                  id="phonenumber"
                  className="input"
                  value={this.state.phonenumber}
                  placeholder="Phone Number"
                  onChange={(event) => this.onInputChange(event)}
                ></input>
                     <span className="icon is-small is-left">
                  <FontAwesomeIcon icon= "mobile-alt"/>
                </span>
              </p>
            </div>
            <div className="field">
              {/* <span ><label className="signUp" htmlFor="name">Name:</label></span> */}
              <p className="control has-icons-left">
                <input
                  id="name"
                  className="input"
                  value={this.state.name}
                  placeholder="Name"
                  onChange={(event) => this.onInputChange(event)}
                ></input>
                       <span className="icon is-small is-left">
                  <FontAwesomeIcon icon= "signature"/>
                </span>
              </p>
            </div>

            <button type="submit" className="button is-success">
              Signup
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default Signup;
