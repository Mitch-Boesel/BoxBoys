import React from 'react';
import { HeaderBar } from "../../Components/HeaderBar";
import { NavigationBar } from "../../Components/NavigationBar";

class Misc extends React.Component {


    render() {
        return (
            <React.Fragment>
                <HeaderBar></HeaderBar>
                <NavigationBar></NavigationBar>

                <h1>Soon to have miscallanous items!</h1>
            </React.Fragment>
        );

    }
}

export default Misc