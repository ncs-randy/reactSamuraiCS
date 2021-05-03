import React, { Component } from 'react';
import {Table, Button} from 'reactstrap';
import {faThumbsUp,faThumbsDown,faSearchLocation,faLocationArrow} from '@fortawesome/free-solid-svg-icons'; /* , faBorderStyle, faLandmark */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
const config = require('./config.json');
const https = require('https');
class Delivery extends Component {
    state = { 
        // isAuth: false,
        deliveries:[],
        region:"West"
        /* deliveries:[
            {
                "orderID" : "100",
                "deliveryID" : "SR1000001",
                "Addressee" : "Seow",
                "Address" : "Yishun",
                "Sender" : "Shopada"
            },

            {
                "orderID" : "101",
                "deliveryID" : "SR1000001",
                "Addressee" : "Seow",
                "Address" : "Yishun",
                "Sender" : "Shopada"
            },

            {
                "orderID" : "102",
                "deliveryID" : "SR1000001",
                "Addressee" : "Seow",
                "Address" : "Yishun",
                "Sender" : "Shopada"
            }
        ] */
     }

     doPostRequest = (data) => {
      return new Promise((resolve, reject) => {
        // change [scs01] to unique pathid, to use DriverUsername
        const options = {
          host: 'app.elasticroute.com',
          path: '/api/v1/plan/scs01?c=sync&w=false',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer SwlZs30g99TY48UmgPeRNLQtf1OlD8q5rs9Z5ayHkYsPsxhptp8mL202zQ47'
          }
        };

        //create the request object with the callback with the result
        const req = https.request(options, (res) => {
        res.setEncoding('utf8');
        //resolve(JSON.stringify(res.statusCode));
        var responsebody = [];
        // on result recieving data push to array
        res.on('data', (d) => {
            responsebody.push(d);
        });
        // on result end concat response and return result
        res.on('end', () => {
          try {
            responsebody = JSON.parse(responsebody.join(''));
            //console.log(responsebody);
          } catch(e) {
            reject(e);
          }
            resolve(responsebody);
          });
        });
        // handle the possible errors
        req.on('error', (e) => {
          reject(e.message);
        });
    
        //do the request
        req.write(JSON.stringify(data));
        //finish the request
        req.end();
      });
     }

     fetchProducts = async () => {
        try{
            const region = this.state.value;
            this.setState({ region: this.state.value });
            // get 100 addresses in the region selected
            const response = await axios.get(`${config.api.getDeliveryRegionAddressURL}` + 'West');
            const Stops = [];
            var address = "";
            var name = "";
            var stop;
            for(var idx in response.data){
                address = response.data[idx].StreetName + ' ' + response.data[idx].PostaCode;
                name = response.data[idx].TrackingID;
                stop = {
                  "name": name,
                  "address": address
                };
                Stops.push(stop);
            }

            var currentDate = new Date();
            // get address and postal code and tracking id and process into request data
            const data = {
                "date": currentDate.toLocaleDateString('en-SG'),
                "stops": Stops,
                "depots": [
                  {
                    "name": "Main Warehouse",
                    "postalcode": 569141
                  }
                ],
                "vehicles": [
                  {
                    "name": "Van 1"
                  }
                ],
                "rushHours": [],
                "generalSettings": {
                  "country": "SG",
                  "timezone": "Asia/Singapore"
                }
              };

            const res = await this.doPostRequest(data).then(result => {
              // do something with result
              console.log(result.data.stops);
            })
            .catch(err => console.error(`Error doing the request for the event: ${err}`));
            //console.log(JSON.stringify(response.data));
            //this.setState({ deliveries: deliveries });
        }catch(err){
            console.log(`An error has occurred: ${err}`);
        }
     }

     async componentDidMount() {
         //const response = await fetch("https://wvhviz13k5.execute-api.ap-southeast-1.amazonaws.com/prod/products");
         //const body = await response.json();
         //this.setState({deliveries:body, isLoading:false});
         this.fetchProducts();
     }

    remove(id){
        let updated = [...this.state.deliveries].filter(i => i.orderID !== id)
        this.setState( {deliveries:updated });
    }

    doNothing(){

    }

    render() { 
        const allDevliveries = this.state.deliveries;
        
        let deliveries = allDevliveries.map(
            delivery =>
            <tr key={delivery.TrackingID}>
                <td>{delivery.TrackingID}</td>
                <td>{delivery.StreetName}</td>
                {/* <td>{delivery.deliveryID}</td>
                <td>{delivery.Addressee}</td>
                <td>{delivery.Address}</td>
                <td>{delivery.Sender}</td> */}
                <td><Button className="btn btn-lg btn-success" onClick={() => this.remove(delivery.orderID)}><FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon> Delivered</Button></td>
                <td><Button className="btn btn-lg btn-danger" onClick={() => this.doNothing()}><FontAwesomeIcon icon={faThumbsDown}></FontAwesomeIcon> Undelivered</Button></td>
                <td><Button className="btn btn-lg btn-info" onClick={() => this.doNothing()}><FontAwesomeIcon icon={faSearchLocation}></FontAwesomeIcon> Search</Button></td>
                <td><Button className="btn btn-lg btn-warning" onClick={this.doNothing()}><FontAwesomeIcon icon={faLocationArrow}></FontAwesomeIcon> Direction</Button></td>
            </tr>
        )

        return ( 
            <div className="container border center">
                <div className="row">
                    <div className="col-12 text-center">
                        <h4>Pending Deliveries</h4>
                    </div>
                </div>

                <div className="row">
                    <div className=".col-xs-12 center text-center ">
                        <Table dark responsive striped bordered hover>
                            <thead>
                                <tr>
                                <th>Tracking ID</th>
                                <th>Address</th>
                                {/* <th>Receiver Name</th>
                                <th>Receiver Address</th>
                                <th>Senders</th> */}
                                <th colSpan='4'>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.deliveries.length === 0 ? <tr><td colSpan='9'>No pending deliveries.</td></tr> : deliveries}
                            </tbody>
                        </Table>
                    </div>
                </div>
               {/* <div><Signup /></div> 
               <div><Login /></div>  */}
               
            </div>
           
           
         );
    }
}
 
export default Delivery;