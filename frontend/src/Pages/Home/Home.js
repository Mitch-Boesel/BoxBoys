import React from 'react'
import { HeaderBar } from "../../Components/HeaderBar";
import { NavigationBar } from "../../Components/NavigationBar";
import { Button } from 'react-bootstrap';
import { BACKENDROUTES } from '../../Config/config.json';
import './Home.css';

function HomePage() {

    const onSave = async () => {
        const postUrl = BACKENDROUTES.BASEULR_UPDATESAVEDB + BACKENDROUTES.SAVE_DB;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }
        const response = await fetch(postUrl, requestOptions);
        window.alert("Database was successfully saved!");
    }


    const onLoad = async () => {
        const postUrl = BACKENDROUTES.BASEULR_UPDATESAVEDB + BACKENDROUTES.lOAD_DB;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }
        const response = await fetch(postUrl, requestOptions);
        window.alert("Database was successfully loaded!");
    }
    return (
        <React.Fragment>
            <HeaderBar />
            <NavigationBar />
            <div className="App"> This website is going to make Karl, Cade, and myself millions of dollars. BoxBoys to the moon</div >
            <div className="updatedb">
                <Button className='update_btn' variant="primary" onClick={onSave}>SaveDb</Button>
                <Button className='update_btn' variant="secondary" onClick={onLoad}>LoadDb</Button>
            </div>
        </React.Fragment>
    );
}
export default HomePage;