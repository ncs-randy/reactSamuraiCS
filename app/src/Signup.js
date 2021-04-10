import React, { useState } from "react";
import UserPool from "./Userpool";
const AmazonCognitoIdentity = require('amazon-cognito-identity-js'); 

const Signup = () => {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    var attributeList = [];
    var dataEmail ={
        Name:"email",
        Value:email
    };

    var dataAddress ={
        Name:"address",Value:address
    };

    var dataName ={
        Name:"name",Value:name
    };

    var dataPhonenumber ={
        Name:"phone_number",Value:phonenumber
    };

    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    var attributeAddress = new AmazonCognitoIdentity.CognitoUserAttribute(dataAddress);
    var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
    var attributePhonenumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhonenumber);

    
    attributeList.push(attributeEmail);
    attributeList.push(attributeAddress);
    attributeList.push(attributeName);
    attributeList.push(attributePhonenumber);

    
    event.preventDefault();

    UserPool.signUp(username, password, attributeList, null, (err, data) => {
      if (err) {
        console.error(err);
      }
      console.log(data);
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
      <label htmlFor="username">Username</label>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <label htmlFor="address">Address</label>
        <input
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        ></input>
        <label htmlFor="phonenumber">Phonenumber</label>
        <input
          value={phonenumber}
          onChange={(event) => setPhonenumber(event.target.value)}
        ></input>
         <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
        ></input>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;