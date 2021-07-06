import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";
import "./NavigationBar.css";

export const NavigationBar = () => (
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
)
