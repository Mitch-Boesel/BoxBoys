import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import "bootstrap/dist/css/bootstrap.css";
import "./HeaderBar.css";
import config from '../Config/config.json'


export const HeaderBar = () => (
    <div className="header_bar">
        <Link className='header_homeLink ' to={config.PAGEROUTES.HOMEPAGE}>
            <h4 className="header_homeLink_text">Box Boys</h4>
        </Link>
        <div className="header_slogan">Best Deals On Packaging!</div>
        <div className="header_search">
            <input type="text" className="header_searchInput" />
            <SearchIcon className='header_searchIcon'></SearchIcon>
        </div>
        <div className="header_nav">
            <div className='header_option'>
                <span className='header_optionLineOne'> Hello Guest</span>
                <span className='header_optionLineTwo'> Sign In </span>
            </div>
            <div className='header_option'>
                <Link to={config.PAGEROUTES.SELLERLOGIN} className='header_sellerSigninLink'>
                    <span className='header_optionLineOne'> Seller Account</span>
                    <span className='header_optionLineTwo'> Sign In </span>
                </Link>
            </div>
            <Link to='/checkout' className='header_link'>
                <div className='header_optionBasket'>
                    <ShoppingCartIcon />
                    <span className="header_optionLineTwo header_basketCount">0</span>
                </div>
            </Link>

        </div>
    </div>
)

/*
    <Navbar bg='dark' variant='dark' expand='lg'>
        <Navbar.Brand>KMC</Navbar.Brand>
        <Nav>
            <Nav.Item className="navigation-header-item">Best Deals On Packaging!</Nav.Item>
            <Nav.Link className="nav-bar-item" href="/SellerLogin">Seller</Nav.Link>
        </Nav>
    </Navbar> */