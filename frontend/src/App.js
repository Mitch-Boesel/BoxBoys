import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Pageroutes from './Config/pageroutes.json';

import HomePage from './Pages/Home/Home';
import Plastics from './Pages/Home/Plastics';
import Corrugated from './Pages/Home/Corrugated';
import Trays from './Pages/Home/Trays';
import Boxes from './Pages/Home/Boxes';
import Misc from './Pages/Home/Misc';
import NoMatch from './Pages/Home/NoMatch';
import SellerLogin from './Pages/Login/SellerLogin';


function App() {
  const PAGEROUTES = Pageroutes.PAGEROUTES;
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
          <Route path={PAGEROUTES.SELLERLOGIN} render={(props) => (
            <SellerLogin {...props} Routes={PAGEROUTES} />)}
          />
          <Route component={NoMatch} />


        </Switch>
      </Router>
    </React.Fragment>

  );
}

export default App;
