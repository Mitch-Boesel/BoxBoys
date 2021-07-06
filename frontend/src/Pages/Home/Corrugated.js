import React from 'react';
import { HeaderBar } from "../../Components/HeaderBar";
import { NavigationBar } from "../../Components/NavigationBar";

class Corrugated extends React.Component {


    render() {
        return (
            <React.Fragment>
                <HeaderBar></HeaderBar>
                <NavigationBar></NavigationBar>
                <h1>Soon to have Corregated Products!</h1>
            </React.Fragment>
        );
    }
}

export default Corrugated