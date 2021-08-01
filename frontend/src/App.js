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


function App() {
  const PAGEROUTES = config.PAGEROUTES;
  const BACKENDROUTES = config.BACKENDROUTES;
  const VALIDATE = config.VALIDATE
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
            <SellerLogin {...props} pageroutes={PAGEROUTES} backendpoints={BACKENDROUTES} validate={VALIDATE} />)}
          />
          <Route component={NoMatch} />


        </Switch>
      </Router>
    </React.Fragment>

  );
}

export default App;
