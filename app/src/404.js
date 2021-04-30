import React, { Component } from 'react';

class NotFound extends Component {
    render() {
        return (
            <section className="section is-medium">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="error-template">
                                <h1>
                                    Oops!</h1>
                                <h2>
                                    404 Not Found</h2>
                                <div class="error-details">
                                    The page you are looking at does not exist, or other error has occured.
                                </div>
                                <div class="error-actions">
                                    <a href="/" class="button is-primary">
                                        Back to SCS </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default NotFound;