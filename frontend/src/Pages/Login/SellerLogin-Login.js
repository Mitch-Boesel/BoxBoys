import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { Redirect, Link, Route } from 'react-router-dom';
import SellerAccount from '../SellerAccount';
class SellerLoginLogin extends React.Component {

    state = {
        email: "",
        password: "",
        loggedIn: false
    }

    inputChange = input => e => {
        this.setState({
            [input]: e.target.value
        });
    };

    async onSubmit(backendRoutes) {
        const getUrl = backendRoutes.BASEURL + backendRoutes.SELLERLOGIN + `?email=${this.state.email}&password=${this.state.password}`;

        const response = await fetch(getUrl);
        if (response.status == 400) {
            window.alert("Invalid Credentials:(")
        }
        else if (response.status == 200) {
            window.alert("Login Successful!");
            this.setState({
                loggedIn: true
            });
            //this.props.history.push(this.props.pageroutes.SELLERACCOUNT)
        }
    }


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

    }
    // Forgot <a href="#">password?</a>
}
/*
        return (
            <form>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot password?
                </p>
                <p className="seller-new-account">
                    New Account <a href="/SellerLogin/Signup">Signup</a>
                </p>
            </form>
        );
*/
export default SellerLoginLogin;