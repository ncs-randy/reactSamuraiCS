import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Login extends Component {
  state = {
    email: "",
    password: ""
  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    //document.getElementById(event.target.id).classList.remove("is-danger");
  };
  
  onSubmit = async (event) => {
    event.preventDefault();

    // change from amazon-cognito-identity-js to aws-amplify
    // becuase of developer have discontinued developing this library amazon-cognito-identity-js, and bug found when doing token verification
    try {
      await Auth.signIn(this.state.email, this.state.password).then((user) => {
        console.log(user)
        if (user.attributes['custom:role'] === 'Driver') {
          this.props.auth.setLoggedInState(true);
          this.props.auth.setUserDriver(true);
          this.props.auth.setUser(user);
          this.props.history.push("/Delivery");
        } else if (user.attributes['custom:role'] === 'Administrator') {
          this.props.auth.setLoggedInState(true);
          this.props.auth.setUserAdmin(true);
          this.props.auth.setUser(user);
          this.props.history.push("/Admin"); // Redirect to admin related page // update the url once page created
        }else {
          console.error("The user is not a driver.");
        }
      });
      
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Log in</h1>
          
          <form onSubmit={this.onSubmit}>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type="text"
                  id="email"
                  placeholder="Email/Username"
                  value={this.state.email}
                  onChange={(event) => this.onInputChange(event)}
                />
                <span className="icon is-small is-left">
                  {/* <i className="fas fa-lock"></i> */}
                  <FontAwesomeIcon icon="user" />
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
              <p className="control">
                <button className="button is-success">
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
};

export default Login;