import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class Navbar extends Component {
    signOut = async () => {
        try {
            Auth.signOut();
            this.props.auth.setLoggedInState(false);
            this.props.auth.setUser(null);
            this.props.auth.setUserDriver(false);
            this.props.auth.setUserAdmin(false);
            //this.props.history.push('/');
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
              <div className="navbar-brand">
                <a className="navbar-item" href="/">
                  SCS
                </a>
              </div>
      
              <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                  <a href="/Tracking" className="navbar-item">
                    Delivery Tracking
                  </a>
                  {this.props.auth.loggedInState && this.props.auth.isDriver && (
                        <a href="/Delivery" className="navbar-item">
                            Orders
                        </a>
                    )
                  }
                  {this.props.auth.loggedInState && this.props.auth.isAdmin && (
                        <a href="/Admin" className="navbar-item">
                            Admin
                        </a>
                    )
                  }
                </div>
      
                <div className="navbar-end">
                  <div className="navbar-item">
                    {this.props.auth.loggedInState && this.props.auth.user && (
                      <p className="username">
                        Hello {this.props.auth.user.username}
                      </p>
                    )}
                    <div className="buttons">
                      {!this.props.auth.loggedInState && (
                        <div>
                          <a href="/SignUp" className="button is-primary">
                            <strong>Driver Sign Up</strong>
                          </a>
                          <a href="/Login" className="button is-light">
                            Log in
                          </a>
                        </div>
                      )}
                      {this.props.auth.loggedInState && (
                        <button onClick={this.signOut} className="button is-light">
                          Log out
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          )
    }
}

export default Navbar;