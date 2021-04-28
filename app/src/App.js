import React, { Component } from 'react'; 
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
// import { CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js";
import Signup from "./Signup";
import Login from "./login";
import Delivery from "./Delivery"
import Tracking from "./Tracking"
import Auth from '@aws-amplify/auth';
// import UserPool from "./Userpool";

class App extends Component {
    state = { 
        isLoading: false,
        loggedInState: false,
        isAuthenticating: true,
        user: null,
        isAdmin: false,
        isDriver: false
    }
     
    setLoggedInState = loggedIn => {
        this.setState({ loggedInState: loggedIn });
    }

    setUserDriver = isDriver => {
        this.setState({ isDriver: isDriver });
    }

    setUserAdmin = isAdmin => {
        this.setState({ isAdmin: isAdmin });
    }
    
    setUser = user => {
        this.setState({ user: user });
    }

    async componentDidMount() {
        try {
            const currentSession = await Auth.currentSession();
            console.log(currentSession);
            const user = await Auth.currentAuthenticatedUser();
            // Added custom:role
            // Driver, Administrator
            if (["Driver", "Administrator"].indexOf(user.attributes['custom:role']) > -1) {
                this.setLoggedInState(true);
                this.setUser(user);
                if (user.attributes['custom:role'] === "Driver") {
                    this.setUserDriver(true);
                    
                } else if (user.attributes['custom:role'] === "Administrator") {
                    this.setUserAdmin(true);
                }
            }
            console.log(this.state.user);
        } catch(error) {
            console.error(error);
            Auth.signOut();
            this.setLoggedInState(false);
            this.setUser(null);
            this.setUserDriver(false);
            this.setUserAdmin(false);
        }
        this.setState({ isAuthenticating: false });
    }

    signOut = async () => {
        try {
            Auth.signOut();
            this.setLoggedInState(false);
            this.setUser(null);
            this.setUserDriver(false);
            this.setUserAdmin(false);
        } catch (error) {
            console.error(error);
        }
    }

    // 
    switchPageFromLoginSignup(page, props, authProps) {
        console.log(this.state.loggedInState);
        console.log(this.state.user);
        if (this.state.loggedInState) {
            if (this.state.isDriver) {
                return (<Redirect to="/Delivery" />);
            } else if (this.state.isAdmin) {
                return (<Redirect to="/Admin" />); //temporary componect
            }
        } else {
            if (page === "Login")
                return (<Login {...props} auth={authProps} />);
            else if (page === "SignUp")
                return (<Signup {...props} />);
        }
        return (<Redirect to="/" />);
    }

    switchPageFromOther(page, props) {
        console.log(this.state)
        if (this.state.loggedInState) { 
            if (page === "Delivery") {
                if (this.state.isDriver) {
                    return (<Delivery {...props} />);
                } else if (this.state.isAdmin) {
                    return (<Redirect to="/Admin" />); //temporary componect
                }
            } else if (page === "Admin") { //temporary componect
                if (this.state.isDriver) {
                    return (<Redirect to="/Delivery" />);
                } else if (this.state.isAdmin) {
                    //return (<Admin {...props} />); //temporary componect, must change after
                }
            }
        } else {
            return (<Redirect to="/Login" />);
        }
        return (<Redirect to="/" />);
    }

    render() { 
        const isLoading = this.state.isLoading;
        const authProps = {
            loggedInState: this.state.loggedInState,
            isDriver: this.state.isDriver,
            isAdmin: this.state.isAdmin,
            user: this.state.user,
            setLoggedInState: this.setLoggedInState,
            setUserDriver: this.setUserDriver,
            setUserAdmin: this.setUserAdmin,
            setUser: this.setUser
        }
        console.log(this.state.loggedInState)
        console.log(this.state.user)
        
        if (isLoading)
            return(<div>Loading...</div>);

        return ( 
            !this.state.isAuthenticating &&
            <div>
                <BrowserRouter>
                    <>
                        <Switch>
                        <Route exact path="/" render={(props) => <Tracking {...props} /> } ></Route>
                        <Route path="/Login" render={(props) => this.switchPageFromLoginSignup("Login", props, authProps)} ></Route>
                        <Route path="/SignUp" render={(props) => this.switchPageFromLoginSignup("SignUp", props, authProps)} ></Route>
                        <Route path="/Delivery" render={(props) => this.switchPageFromOther("Delivery", props)} ></Route>
                        <Route exact path="/Tracking" render={(props) => ( <Tracking {...props} />)} ></Route>
                        
                        {/* Temporary route create here for admin related componect
                        Add/edit once created related component */}
                        {/* <Route exact path="/Admin" render={(props) => this.switchPageFromOther("Admin", props)} ></Route>  */}

                        </Switch>
                        
                    </>
                </BrowserRouter>
                {this.state.loggedInState && (
                    <button onClick={this.signOut}>Sign Out</button>
                )}
            </div>
           
           
         );
    }
}
 
export default App;