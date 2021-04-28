import React, { Component } from "react";
import { Table } from "reactstrap";
import "./App.css";
import Delivery_Animation from "./images/Delivery_Animation.gif";

import axios from "axios";
const config = require("./config.json");

class Tracking extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    isLoading: false,
    events: [],
    value: "",
    trackingid: "",
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("Tracking ID is submitted: " + this.state.value);
    console.log(this.state.value);
    // try {
    //   const trackingid = this.state.value;
    //   const response = axios.get(`${config.api.trackingIDURL}` + trackingid);
    //   console.log(response);
    //   const events = response.data;
    //   console.log(response.data);
    //   this.setState({ events: response.data });

    // } catch(err) {
    //   console.log(`An error has occurred: ${err}`);
    // }
    this.fetchEvents();
    event.preventDefault();
  }

  fetchEvents = async () => {
    try {
      // const response = await axios.get(`${config.api.trackingIDURL}`);
      const trackingid = this.state.value;
      this.setState({ trackingid: this.state.value });

      const response = await axios.get(
        `${config.api.trackingIDURL}` + trackingid
      );
      //   console.log(`${config.api.trackingIDURL}` + trackingid);
      //   console.log(response);
      const events = response.data;
      //   const events = [
      //     {
      //       TrackingID: "SCS_yhj61kwtscsko02tsqc",
      //       EventDescription: "Order Recieved",
      //       EventTimeStamp: "27/04/2021, 21:40:12",
      //     },
      //   ];
      this.setState({ events: events });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  };

  async componentDidMount() {
    //const response = await fetch("https://wvhviz13k5.execute-api.ap-southeast-1.amazonaws.com/prod/products");
    //const body = await response.json();
    //this.setState({deliveries:body, isLoading:false});
    // this.fetchEvents();
  }

  remove(id) {
    let updated = [...this.state.events].filter((i) => i.orderID !== id);
    this.setState({ events: updated });
  }

  doNothing() {}

  signOut() {
    if (this.authUser != null) {
      this.authUser.signOut();
    }
  }

  render() {
    const isLoading = this.state.isLoading;
    const allEvents = this.state.events;

    //detect if current seesion is logged in]
    // if(this.authUser == null) {
    //     return (
    //         <Login />
    //     )
    // }

    if (isLoading) return <div>Loading...</div>;

    let events = allEvents.map((events) => (
      <tr key={events.TrackingID}>
        <td>{events.TrackingID}</td>
        <td>{events.EventDescription}</td>
        <td>{events.EventTimeStamp}</td>
        {/* <td>{delivery.deliveryID}</td>
                <td>{delivery.Addressee}</td>
                <td>{delivery.Address}</td>
                <td>{delivery.Sender}</td> */}
      </tr>
    ));

    return (
      <div>
        <div className="row d-flex justify-content-center outer-1">
          <p>Samurai Courier Service (SCS)</p>
        </div>
        <div className="row d-flex justify-content-center outer-1">
          <img
            className="row d-flex justify-content-center"
            src={Delivery_Animation}
          />
        </div>

        <div className="col-12 trackingid_title">
          <form
            className="row d-flex justify-content-center"
            onSubmit={this.handleSubmit}
          >
            <div>
              <label>
                <div className="tracking_input_group">
                  <div>
                    <span className="tracking_field">
                      {" "}
                      <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                        placeholder="Search By Tracking Number"
                      />
                    </span>
                    <span>
                      <input
                        type="submit"
                        disabled={!this.state.value}
                        value="Track"
                      />
                    </span>
                  </div>
                </div>
              </label>
            </div>
          </form>
        </div>

        <div className="container border border-secondary rounded center">
          <div className="row">
            <div className="col-12">
              <h5>
                ORDER{" "}
                <span className="text-primary font-weight-bold">
                  #{this.state.trackingid}
                </span>
              </h5>
            </div>
          </div>

          <div>
            <div className=".col-xs-12 center text-center ">
              <Table dark responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Tracking ID</th>
                    <th>Delivery Status</th>
                    {/* <th>Receiver Name</th>
                                <th>Receiver Address</th>
                                <th>Senders</th> */}
                    <th colSpan="4">Time</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.events.length === 0 ? (
                    <tr>
                      <td colSpan="9">No pending deliveries.</td>
                    </tr>
                  ) : (
                    events
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>

        <div className="container px-1 px-md-4 py-5 mx-auto">
          <div className="card">
            <div className="row d-flex justify-content-between px-3 top">
              <div className="d-flex">
                <h5>
                  ORDER{" "}
                  <span className="text-primary font-weight-bold">
                    #{this.state.trackingid}
                  </span>
                </h5>
              </div>
              <div className="d-flex flex-column text-sm-right">
                <p className="mb-0">
                  Expected Arrival <span>01/12/19</span>
                </p>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-12">
                <ul id="progressbar" className="text-center">
                  <li className="active step0"></li>
                  <li className="active step0"></li>
                  <li className="active step0"></li>
                  <li className="step0"></li>
                </ul>
              </div>
            </div>
            <div className="row justify-content-between top">
              <div className="row d-flex icon-content">
                {" "}
                <img className="icon" src="https://i.imgur.com/9nnc9Et.png" />
                <div className="d-flex flex-column">
                  <p className="font-weight-bold">
                    Order
                    <br />
                    Processed
                  </p>
                </div>
              </div>
              <div className="row d-flex icon-content">
                {" "}
                <img className="icon" src="https://i.imgur.com/u1AzR7w.png" />
                <div className="d-flex flex-column">
                  <p className="font-weight-bold">
                    Order
                    <br />
                    Shipped
                  </p>
                </div>
              </div>
              <div className="row d-flex icon-content">
                {" "}
                <img className="icon" src="https://i.imgur.com/TkPm63y.png" />
                <div className="d-flex flex-column">
                  <p className="font-weight-bold">
                    Order
                    <br />
                    En Route
                  </p>
                </div>
              </div>
              <div className="row d-flex icon-content">
                {" "}
                <img className="icon" src="https://i.imgur.com/HdsziHP.png" />
                <div className="d-flex flex-column">
                  <p className="font-weight-bold">
                    Order
                    <br />
                    Arrived
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tracking;
