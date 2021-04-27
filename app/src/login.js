import React, { Component } from "react";
// import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify"
// import App from './App';
// import UserPool from "./Userpool";
// import Delivery from "./Delivery"
// import Signup from "./Signup";

class Login extends Component {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
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

    // const user = new CognitoUser({
    //   Username: email,
    //   Pool: UserPool,
    // });

    // const authDetails = new AuthenticationDetails({
    //   Username: email,
    //   Password: password,
    // });

    // user.authenticateUser(authDetails, {
    //   onSuccess: (data) => {
    //     console.log("onSuccess: ", data);
    //     // console.log(UserPool.getCurrentUser());
    //     const tokens = {
    //       IdToken: data.getIdToken().getJwtToken(),
    //       AccessToken: data.getAccessToken().getJwtToken(),
    //       RefreshToken: data.getRefreshToken().getToken()
    //     };
    //     //user['tokens'] = tokens;
    //     sessionStorage.setItem('loggedInUser', JSON.stringify(tokens));
    //     sessionStorage.setItem('email', email);
    //     //console.log(sessionStorage.getItem('loggedInUser'));
    //     //window.location.href = '/';
    //   },
    //   onFailure: (err) => {
    //     console.error("onFailure: ", err);
    //   },
    //   newPasswordRequired: (data) => {
    //     console.log("newPasswordRequired: ", data);
    //   },
    // });

    // change from amazon-cognito-identity-js to aws-amplify
    // becuase of developer have discontinued developing this library amazon-cognito-identity-js, and bug found when doing token verification
    // suggest if can delete unused code
    try {
      const user = await Auth.signIn(this.state.email, this.state.password);
      console.log(user);
      if (user.attributes['custom:role'] === 'Driver') {
        this.props.auth.setLoggedInState(true);
        this.props.auth.setUser(user);
        this.props.history.push("/");
      } else {
        console.error("The user is not a driver.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      
      <div>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="email">Email/Username</label>
          <input
            id="email"
            value={this.state.email}
            onChange={(event) => this.onInputChange(event)}> 
          </input>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            value={this.state.password}
            onChange={(event) => this.onInputChange(event)}>
          </input>

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
};

export default Login;