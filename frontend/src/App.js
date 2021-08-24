import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import config from './Config/config.json';

import HomePage from './Pages/Home/Home';
import Plastics from './Pages/Home/Plastics';
import Corrugated from './Pages/Home/Corrugated';
import Trays from './Pages/Home/Trays';
import Boxes from './Pages/Home/Boxes';
import Misc from './Pages/Home/Misc';
import NoMatch from './Pages/Home/NoMatch';
import SellerLogin from './Pages/Login/SellerLogin';
import SellerAccount from './Pages/SellerAccount/SellerAccount';
import SellerSignup from "./Pages/Login/SellerSignup";
import AddProduct from "./Pages/SellerAccount/AddProduct";
import EditProduct from "./Pages/SellerAccount/EditProduct";
import SellerReports from "./Pages/SellerAccount/SellerReports";
import SellerOrders from "./Pages/SellerAccount/SellerOrders";


function App() {
  const PAGEROUTES = config.PAGEROUTES;
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path={PAGEROUTES.HOMEPAGE} component={HomePage} />
          <Route path={PAGEROUTES.PLASTICS} component={Plastics} />
          <Route path={PAGEROUTES.CORRUGATED} component={Corrugated} />
          <Route path={PAGEROUTES.TRAYS} component={Trays} />
          <Route path={PAGEROUTES.BOXES} component={Boxes} />
          <Route path={PAGEROUTES.MISC} component={Misc} />
          <Route path={PAGEROUTES.ADDPRODUCT} component={AddProduct} />
          <Route path={PAGEROUTES.EDITPRODUCT} component={EditProduct} />
          <Route path={PAGEROUTES.SELLERREPORTS} component={SellerReports} />
          <Route path={PAGEROUTES.SELLERORDERS} component={SellerOrders} />
          <Route path={PAGEROUTES.SELLERACCOUNT} component={SellerAccount} />
          <Route path={PAGEROUTES.SELLERSIGNUP} component={SellerSignup} />
          <Route path={PAGEROUTES.SELLERLOGIN} component={SellerLogin} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </React.Fragment>

  );
}

export default App;
