import React from 'react';
import './login.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SellerLoginSignup from './SellerLogin-Signup';
import SellerLoginLogin from './SellerLogin-Login';


class SellerLogin extends React.Component {
    render() {
        return (
            <Router>
                <div className="login-wrapper">
                    <div className="login-inner">
                        <Switch>

                            <Route exact path={this.props.pageroutes.SELLERLOGIN} render={(props) => (
                                <SellerLoginLogin backendpoints={this.props.backendpoints} pageroutes={this.props.pageroutes} />
                            )} />
                            <Route exact path={this.props.pageroutes.SELLERSIGNUP} render={(props) => (
                                <SellerLoginSignup backendpoints={this.props.backendpoints} validate={this.props.validate} />
                            )} />

                        </Switch>
                    </div>
                </div>

            </Router>
        )
    }
}
/*
                            <Route exact path={this.props.pageroutes.SELLERLOGIN} component={SellerLoginLogin}></Route>
                            <Route path={this.props.pageroutes.SELLERSIGNUP} component={SellerLoginSignup}></Route>
                            */
export default SellerLogin;