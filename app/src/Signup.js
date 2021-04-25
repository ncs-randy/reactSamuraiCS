import React, { Component } from "react";
import { Auth } from 'aws-amplify'
// const AmazonCognitoIdentity = require('amazon-cognito-identity-js'); 

class Signup extends Component {
  // const [email, setEmail] = useState("");
  // const [address, setAddress] = useState("");
  // const [name, setName] = useState("");
  // const [username, setUsername] = useState("");
  // const [phonenumber, setPhonenumber] = useState("");
  // const [password, setPassword] = useState("");

  state ={
    email: "",
    address: "",
    name: "",
    username: "",
    phonenumber: "",
    password: ""
  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    //document.getElementById(event.target.id).classList.remove("is-danger");
  }

  onSubmit = async (event) => {
    // var attributeList = [];
    // var dataEmail ={
    //     Name:"email",
    //     Value:email
    // };

    // var dataAddress ={
    //     Name:"address",Value:address
    // };

    // var dataName ={
    //     Name:"name",Value:name
    // };

    // var dataPhonenumber ={
    //     Name:"phone_number",Value:phonenumber
    // };

    // var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    // var attributeAddress = new AmazonCognitoIdentity.CognitoUserAttribute(dataAddress);
    // var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
    // var attributePhonenumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhonenumber);

    
    // attributeList.push(attributeEmail);
    // attributeList.push(attributeAddress);
    // attributeList.push(attributeName);
    // attributeList.push(attributePhonenumber);

    
    event.preventDefault();

    // UserPool.signUp(username, password, attributeList, null, (err, data) => {
    //   if (err) {
    //     console.error(err);
    //   }
    //   console.log(data);
    // });

    // change from amazon-cognito-identity-js to aws-amplify
    // becuase of developer have discontinued developing this library amazon-cognito-identity-js, and bug found when doing token verification
    // suggest if can delete unused code
    const { username, password } = this.state;
    try {
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          email: this.state.email,
          address: this.state.address,
          name: this.state.name,
          phone_number: this.state.phonenumber
        }
      });
      console.log(signUpResponse);
      this.props.history.push("/");
    } catch(error) {
      console.log(error);
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
        <label htmlFor="username">Username</label>
          <input
            id="username"
            value={this.state.username}
            onChange={(event) => this.onInputChange(event)}
          ></input>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            value={this.state.email}
            onChange={(event) => this.onInputChange(event)}
          ></input>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            value={this.state.password}
            onChange={(event) => this.onInputChange(event)}
          ></input>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            value={this.state.address}
            onChange={(event) => this.onInputChange(event)}
          ></input>
          <label htmlFor="phonenumber">Phonenumber</label>
          <input
            id="phonenumber"
            value={this.state.phonenumber}
            onChange={(event) => this.onInputChange(event)}
          ></input>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={this.state.name}
            onChange={(event) => this.onInputChange(event)}
          ></input>

          <button type="submit">Signup</button>
        </form>
      </div>
    );
  }
};

export default Signup;