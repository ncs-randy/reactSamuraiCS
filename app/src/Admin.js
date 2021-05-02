import React from "react";
import { Component } from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { Tabs, Tab, Row, Col } from "react-bootstrap";
import axios from "axios";
const config = require("./config.json");

class Admin extends Component {
  state = {
    fetcheddata: [],
    deliveriesMonthly: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
      ],
      datasets: [
        {
          label: "Successful Delivery",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, .3)",
          borderColor: "rgb(205, 130, 158)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(205, 130,1 58)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: "Failed Delivery",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(184, 185, 210, .3)",
          borderColor: "rgb(35, 26, 136)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(35, 26, 136)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [10, 15, 1, 3, 20, 27, 23],
        },
      ],
    },
    driverMonthly: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
      ],
      datasets: [
        {
          label: "Total number of Drivers",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, .3)",
          borderColor: "rgb(205, 130, 158)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(205, 130,1 58)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [100, 101, 80, 81, 56, 55, 40],
        },
        {
          label: "Total number of new drivers",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(184, 185, 210, .3)",
          borderColor: "rgb(35, 26, 136)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(35, 26, 136)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [1, 10, 5, 6, 6, 3, 2],
        },
        {
          label: "Total number of resigned drivers",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(184, 185, 210, .3)",
          borderColor: "rgb(35, 26, 136)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(35, 26, 136)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [-1, -10, -5, -6, -6, -3, -2],
        },
      ],
    },
    ordersMonthly: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
      ],
      datasets: [
        {
          label: "Open Orders",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, .3)",
          borderColor: "rgb(205, 130, 158)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(205, 130,1 58)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: "Closed Orders",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(184, 185, 210, .3)",
          borderColor: "rgb(35, 26, 136)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(35, 26, 136)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [10, 15, 1, 3, 20, 27, 23],
        },
      ],
    },
  };

  fetchEvents = async () => {
    try {
      //     const response = await axios.get(
      //       `${config.api.graphURL}`
      //     );
      //   const fetcheddata = response.data;
      //   const fetcheddata = [
      //       {TrackingID: "SCS_123",
      //       EventDescription: "Order Recieved",
      //       EventTimeStamp: "27/04/2021, 1:29:10 pm",
      //   }
      //   ];
      //   this.setState({ fetcheddata: fetcheddata });
      //   console.log("Fetched data:");
      //   console.log(this.state.fetcheddata);
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  };

  async componentDidMount() {
    //const response = await fetch("https://wvhviz13k5.execute-api.ap-southeast-1.amazonaws.com/prod/products");
    //const body = await response.json();
    //this.setState({deliveries:body, isLoading:false});
    this.fetchEvents();
  }

  render() {
    return (
      <div>
        <div>

          <div className="tab-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  <Tabs defaultActiveKey="home">
                    <Tab eventKey="home" title="Home">
                      <div className="tab-item-wrapper scsgraph" >
                          <br/>
                          <br />
                        <h1><b> Samurai Courier Service (SCS) Reports</b></h1>
                        <br />
                        <br />
                        <Row >
                          <Col>
                            <img
                              className=""
                              style={{width:"30vw"}}
                              src="https://i.pinimg.com/originals/f8/8a/ca/f88acab7ffd127b4465659500aa0538f.gif"
                              alt=""
                            />
                          </Col>
                          <Col style={{textAlign:"justify"}}>
                              <br/>
                              <br/>
                            <p >
                            Reports will provide important detail that can be used to help develop future forecasts, marketing plans, guide budget planning and improve decision-making.
                            The reports page records the incoming deliveries
                            and drivers data and then presents it in charts
                            and graphs.
                            </p>
                            <br/>
                            <br/>
                            <ul>
                           <li><b>Driver Reports inlcude:</b></li>
                           <p>- Number of deliveries per month</p>
                           <p>- Number of drivers per month</p>
                            <li><b>Order Reports:</b></li>
                            <p>- Number of open and close order per month</p>
                         
                            </ul>
                            
                          </Col>
                        </Row>
                      </div>
                    </Tab>

                    <Tab eventKey="Drivers" title="Drivers">
                      <div className="tab-item-wrapper">
                        <div>
                        <br />
                        <br />
                          <h1><b>Driver Analytics</b></h1>
                          <div className="container">
                            <div className="row">
                              <div className="col">
                                <MDBContainer>
                                  <h3 className="mt-5">Deliveries (Monthly)</h3>
                                  <Line
                                    data={this.state.deliveriesMonthly}
                                    options={{ responsive: true }}
                                  />
                                </MDBContainer>
                              </div>
                              <div className="col">
                                <MDBContainer>
                                  <h3 className="mt-5">Drivers (Monthly)</h3>
                                  <Line
                                    data={this.state.driverMonthly}
                                    options={{ responsive: true }}
                                  />
                                </MDBContainer>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>

                    <Tab eventKey="Orders" title="Orders">
                      <div className="tab-item-wrapper">
                        <div>
                        <br />
                        <br />
                          <h1><b>Order Analytics</b></h1>
                          <div className="container">
                            <div className="row">
                              <div className="col">
                                <MDBContainer>
                                  <h3 className="mt-5">Orders (Monthly)</h3>
                                  <Line
                                    data={this.state.ordersMonthly}
                                    options={{ responsive: true }}
                                  />
                                </MDBContainer>
                              </div>
                              <div className="col"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
