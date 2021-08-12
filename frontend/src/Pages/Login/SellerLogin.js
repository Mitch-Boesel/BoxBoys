import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import config from '../../Config/config.json'
import './SellerLogin.css'
import { useStateValue } from '../../StateProvider'


function SellerLogin() {
    const [{ loggedIn }, dispatch] = useStateValue();

    const { BACKENDROUTES, PAGEROUTES } = config;

    const setSellerCredentials = (val) => {
        dispatch({
            type: "SET_SELLER_CREDENTIALS",
            email: data.email,
            sellerId: val,
            loggedIn: true
        })
    }

    const [data, setState] = useState({
        email: "",
        password: "",
        loggedIn: false
    });

    const inputChange = input => e => {
        setState({ ...data, [input]: e.target.value })
    };

    const onSubmit = async () => {
        const getUrl = BACKENDROUTES.BASEURL + BACKENDROUTES.SELLERLOGIN + `?email=${data.email}&password=${data.password}`;

        const response = await fetch(getUrl);
        const sellerId = await response.text();
        if (response.status == 400) {
            window.alert("Invalid Credentials:(")
        }
        else if (response.status == 200) {
            debugger;
            window.alert("Login Successful!");
            setSellerCredentials(sellerId.toString());
        }
    };


    return (
        <div>
            {loggedIn &&
                <Redirect to={PAGEROUTES.SELLERACCOUNT} />
            }

            {
                !loggedIn &&
                <div className="sellerlogin">
                    <h3 className="seller_header">Seller Account Sign In</h3>
                    <Form>
                        <Form.Group className="seller_field">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" onChange={inputChange('email')}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={inputChange('password')}></Form.Control>
                        </Form.Group>
                        <Button className='seller_submit' variant="primary" onClick={onSubmit}>Log In</Button>
                    </Form>
                    <p className="forgot-password text-right">
                        Forgot password?
                    </p>
                    <p className="seller-new-account">
                        New Account <Link to={PAGEROUTES.SELLERSIGNUP}>
                            <span>Signup</span>
                        </Link>
                    </p>
                </div>
            }
        </div>)





    // Forgot <a href="#">password?</a>
}
/*

    render() {
        const { backendpoints, pageroutes } = this.props;
        if (this.state.loggedIn) {
            debugger;

            return (
                <div>
                    <Link to={pageroutes.SELLERACCOUNT} />
                    <Route path={pageroutes.SELLERACCOUNT}>
                        <SellerAccount />
                    </Route>
                </div>);
        }
        else {
            return (
                <div>
                    <h3>Sign In</h3>
                    <Form>
                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" onChange={this.inputChange('email')}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={this.inputChange('password')}></Form.Control>
                        </Form.Group>
                        <Button variant="primary" onClick={() => this.onSubmit(backendpoints)}>Log In</Button>
                    </Form>
                    <p className="forgot-password text-right">
                        Forgot password?
                </p>
                    <p className="seller-new-account">
                        New Account <a href="/SellerLogin/Signup">Signup</a>
                    </p>
                </div>);

        }
*/
export default SellerLogin;