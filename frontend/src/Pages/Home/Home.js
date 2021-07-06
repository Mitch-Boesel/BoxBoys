import React from 'react'
import { HeaderBar } from "../../Components/HeaderBar";
import { NavigationBar } from "../../Components/NavigationBar";

class HomePage extends React.Component {


    render() {
        return (
            <React.Fragment>
                <HeaderBar />
                <NavigationBar />
                <div className="App"> This website is going to make Karl, Cade, and myself millions of dollars</div >
            </React.Fragment>
        );
    }
}

export default HomePage;