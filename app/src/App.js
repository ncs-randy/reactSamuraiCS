import React, { Component } from 'react'; 
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
// import { CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js";
import Signup from "./Signup";
import Login from "./login";
import Delivery from "./Delivery"
import Auth from '@aws-amplify/auth';
// import UserPool from "./Userpool";

class App extends Component {
    state = { 
        isLoading: false,
        loggedInState: false,
        isAuthenticating: true,
        user: null
    }
     
    setLoggedInState = loggedIn => {
        this.setState({ loggedInState: loggedIn });
    }
    
    setUser = user => {
        this.setState({ user: user });
    }

    async componentDidMount() {
        try {
            const currentSession = await Auth.currentSession();
            console.log(currentSession);
            this.setLoggedInState(true);
            this.setUser(await Auth.currentAuthenticatedUser());
            console.log(this.state.user);
        } catch(error) {
            console.error(error);
        }
        this.setState({ isAuthenticating: false });
    }

    signOut = async () => {
        try {
            Auth.signOut();
            this.setLoggedInState(false);
            this.setUser(null);
        } catch (error) {
            console.error(error);
        }
    }

    render() { 
        const isLoading = this.state.isLoading;
        const authProps = {
            loggedInState: this.state.loggedInState,
            user: this.state.user,
            setLoggedInState: this.setLoggedInState,
            setUser: this.setUser
        }
        
        
        if (isLoading)
            return(<div>Loading...</div>);

        return ( 
            !this.state.isAuthenticating &&
            <div>
                <BrowserRouter>
                    <>
                        <Switch>
                        <Route exact path="/" render={(props) => 
                            (this.state.loggedInState ? <Delivery {...props} auth={authProps} /> : <Redirect to="/Login" />)
                        } ></Route>
                        <Route path="/Login" render={(props) => 
                            (this.state.loggedInState ? <Redirect to="/" /> : <Login {...props} auth={authProps} /> )
                        } ></Route>
                        <Route path="/SignUp" render={(props) =>
                            (this.state.loggedInState ? <Redirect to="/" /> : <Signup {...props} auth={authProps} /> )
                        } ></Route>
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