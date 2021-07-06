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
                            <Route exact path={this.props.Routes.SELLERLOGIN} component={SellerLoginLogin}></Route>
                            <Route path={this.props.Routes.SELLERSIGNUP} component={SellerLoginSignup}></Route>
                        </Switch>
                    </div>
                </div>

            </Router>
        )
    }
}

export default SellerLogin;