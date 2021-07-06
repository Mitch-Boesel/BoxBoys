import React from 'react';
import { HeaderBar } from "../../Components/HeaderBar";
import { NavigationBar } from "../../Components/NavigationBar";

class Plastics extends React.Component {


    render() {
        return (
            <React.Fragment>
                <HeaderBar></HeaderBar>
                <NavigationBar></NavigationBar>

                <h1>Soon to have plastics!</h1>
            </React.Fragment>
        );

    }
}

export default Plastics