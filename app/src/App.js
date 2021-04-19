import React, { Component } from 'react'; 
import {Table, Button} from 'reactstrap';
import {faThumbsUp,faThumbsDown,faSearchLocation,faLocationArrow} from '@fortawesome/free-solid-svg-icons'; /* , faBorderStyle, faLandmark */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect, Route, Router } from 'react-router-dom'
import Signup from "./Signup";
import Login from "./login";
import UserPool from "./Userpool";

class App extends Component {
    state = { 
        isLoading: false,
        isAuth: false,
        authUser: UserPool.getCurrentUser(),
        deliveries:[]
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

     async componentDidMount() {
         const response = await fetch("https://wvhviz13k5.execute-api.ap-southeast-1.amazonaws.com/prod/products");
         const body = await response.json();
         this.setState({deliveries:body, isLoading:false});
     }

    remove(id){
        let updated = [...this.state.deliveries].filter(i => i.orderID !== id)
        this.setState( {deliveries:updated });
    }

    doNothing(){

    }

    signOut() {
        if(this.authUser != null) {
            this.authUser.signOut();
        }
    }

    render() { 
        const isLoading = this.state.isLoading;
        const allDevliveries = this.state.deliveries;

        //detect if current seesion is logged in
        if(this.authUser == null) {
            return (
                <Login />
            )
        }

        if (isLoading)
            return(<div>Loading...</div>);

        let deliveries = allDevliveries.map(
            delivery =>
            <tr key={delivery.id}>
                <td>{delivery.id}</td>
                <td>{delivery.productname}</td>
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
            <div className="container border border-secondary rounded center">
                <div className="row">
                    <div className="col-12">
                        <h4>Pending Deliveries</h4>
                    </div>
                </div>

                <div className="row">
                    <div className=".col-xs-12 center text-center ">
                        <Table dark responsive striped bordered hover>
                            <thead>
                                <tr>
                                <th>Order #</th>
                                <th>Delivery #</th>
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
               <button onClick={this.doNothing()}>Sign Out</button>
            </div>
           
           
         );
    }
}
 
export default App;