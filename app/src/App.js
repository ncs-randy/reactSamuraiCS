import React, { Component } from 'react'; 
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Signup from "./Signup";
import Login from "./login";
import Admin from "./Admin";
import Delivery from "./Delivery";
import Tracking from "./Tracking";
import Navbar from "./Narbar";
import NotFound from './404';
import Auth from '@aws-amplify/auth';
import './App.css';

class App extends Component {
    state = { 
        isLoading: false,
        loggedInState: false,
        isAuthenticating: true,
        user: null,
        isAdmin: false,
        isDriver: false,
        jwt: null
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

    setJWT = token => {
        this.setState({ jwt: token });
    }

    async componentDidMount() {
        try {
            await Auth.currentSession();
            const user = await Auth.currentAuthenticatedUser();
            // Added custom:role
            // Driver, Administrator
            console.log("test vulnerability");
            if (["Driver", "Administrator"].indexOf(user.attributes['custom:role']) > -1) {
                this.setLoggedInState(true);
                this.setUser(user);
                if (user.attributes['custom:role'] === "Driver") {
                    this.setUserDriver(true);
                    
                } else if (user.attributes['custom:role'] === "Administrator") {
                    this.setUserAdmin(true);
                }
            }
        } catch(error) {
            //console.error(error);
            Auth.signOut();
            this.setLoggedInState(false);
            this.setUser(null);
            this.setUserDriver(false);
            this.setUserAdmin(false);
            this.setJWT(null);
        }
        this.setState({ isAuthenticating: false });
    }

    // use only for routes Login and Signup
    switchPageFromLoginSignup(page, props, authProps) {
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
                return (<Signup />);
        }
        return (<Redirect to="/" />);
    }

    // use only for other routes @params page, hardcode into this when created new component
    switchPageFromOther(page, props, authProps) {
        if (this.state.loggedInState) { 
            if (page === "Delivery") {
                if (this.state.isDriver) {
                    return (<Delivery {...props} auth={authProps} />);
                } else if (this.state.isAdmin) {
                    return (<Redirect to="/Admin" />); //temporary componect
                }
            } else if (page === "Admin") { //temporary componect
                if (this.state.isDriver) {
                    return (<Redirect to="/Delivery" />);
                } else if (this.state.isAdmin) {
                    return (<Admin {...props} />); 
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
            jwt: this.state.jwt,
            setLoggedInState: this.setLoggedInState,
            setUserDriver: this.setUserDriver,
            setUserAdmin: this.setUserAdmin,
            setUser: this.setUser,
            setJWT: this.setJWT
        }
        
        if (isLoading)
            return(<div>Loading...</div>);

        return ( 
            !this.state.isAuthenticating &&
            <div>
                <BrowserRouter>
                    <div>
                        <Navbar auth={authProps} />
                        <Switch>
                        <Route exact path="/" render={(props) => <Tracking {...props} /> } ></Route>
                        <Route path="/Login" render={(props) => this.switchPageFromLoginSignup("Login", props, authProps)} ></Route>
                        <Route path="/SignUp" render={(props) => this.switchPageFromLoginSignup("SignUp", props, authProps)} ></Route>
                        <Route path="/Delivery" render={(props) => this.switchPageFromOther("Delivery", props, authProps)} ></Route>
                        <Route exact path="/Tracking" render={(props) => ( <Tracking {...props} />)} ></Route>
                        
                        {/* Temporary route create here for admin related componect
                        Add/edit once created related component */}\
                        {/* <Route exact path="/Admin" render={(props) => ( <Admin {...props} />)} ></Route> */}
                        <Route exact path="/Admin" render={(props) => this.switchPageFromOther("Admin", props)} ></Route> 

                        {/* Route to 404 if invalid url detected */}
                        <Route component={NotFound} />

                        </Switch>
                        
                    </div>
                </BrowserRouter>
            </div>
           
           
         );
    }
}
 
export default App;
