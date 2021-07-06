import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.css";
import "./NavigationBar.css";

export const HeaderBar = () => (
    <Navbar bg='dark' variant='dark' expand='lg'>
        <Navbar.Brand>KMC</Navbar.Brand>
        <Nav>
            <Nav.Item className="navigation-header-item">Best Deals On Packaging!</Nav.Item>
            <Nav.Link className="nav-bar-item" href="/SellerLogin">Seller</Nav.Link>
        </Nav>
    </Navbar>
)