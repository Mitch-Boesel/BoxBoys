import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./NavigationBar.css";
import { Link } from 'react-router-dom';
import config from '../Config/config.json'

export const NavigationBar = () => (
    <div className="navbar">
        <div className="navbar_option">
            <Link to={config.PAGEROUTES.HOMEPAGE} className='navbar_link'>
                <span>Home</span>
            </Link>
        </div>

        <div className="navbar_option">
            <Link to={config.PAGEROUTES.PLASTICS} className='navbar_link'>
                <span>Plastics</span>
            </Link>
        </div>

        <div className="navbar_option">
            <Link to={config.PAGEROUTES.CORRUGATED} className='navbar_link'>
                <span>Corrugated</span>
            </Link>
        </div>

        <div className="navbar_option">
            <Link to={config.PAGEROUTES.TRAYS} className='navbar_link'>
                <span>Trays</span>
            </Link>
        </div>

        <div className="navbar_option">
            <Link to={config.PAGEROUTES.BOXES} className='navbar_link'>
                <span>Boxes</span>
            </Link>
        </div>

        <div className="navbar_option">
            <Link to={config.PAGEROUTES.MISC} className='navbar_link'>
                <span>Everything Else</span>
            </Link>
        </div>


    </div>
)

/*
    <Navbar className="justify-content-center" bg='secondary' expand="lg">
        <Navbar.Brand>Popular</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-center">
                <Nav.Link className="nav-bar-item" href="/">Home</Nav.Link>
                <Nav.Link className="nav-bar-item" href="/Plastics">Plastics</Nav.Link>
                <Nav.Link className="nav-bar-item" href="/Corrugated">Corrugated</Nav.Link>
                <Nav.Link className="nav-bar-item" href="/Trays">Trays</Nav.Link>
                <Nav.Link className="nav-bar-item" href="/Boxes">Boxes</Nav.Link>
                <Nav.Link className="nav-bar-item" href="/Misc">Misc.</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
*/