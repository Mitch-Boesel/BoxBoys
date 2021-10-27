import React from 'react';
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import "bootstrap/dist/css/bootstrap.css";
import "./HeaderBar.css";
import { PAGEROUTES, LOCALSTORAGE_KEYS } from '../Config/config.json'
import { useStateValue } from '../StateProvider'


function HeaderBar() {
    const [{ sellerLoggedIn }, dispatch] = useStateValue();

    const SellerLogout = () => {
        dispatch({
            type: "SELLER_LOGOUT"
        })

        localStorage.removeItem(LOCALSTORAGE_KEYS.EMAIL);
        localStorage.removeItem(LOCALSTORAGE_KEYS.SELLERID);
        window.alert("You have succesfully logged out!");
    }

    return (
        <div className="header_bar">
            <Link className='header_homeLink ' to={PAGEROUTES.HOMEPAGE}>
                <h4 className="header_homeLink_text">Box Boys</h4>
            </Link>
            <div className="header_slogan">Best Deals On Packaging!</div>
            <div className="header_search">
                <input type="text" className="header_searchInput" />
                <SearchIcon className='header_searchIcon'></SearchIcon>
            </div>
            <div className="header_nav">
                <div>
                    {!sellerLoggedIn && <div className='header_option'>
                        <span className='header_optionLineOne'> Hello Guest</span>
                        <span className='header_optionLineTwo'> Sign In </span>
                    </div>}
                    {sellerLoggedIn && <div className='header_SellerSignout' onClick={SellerLogout}>
                        <span className='header_optionLineOne'> Seller</span>
                        <span className='header_optionLineTwo'> Logout </span>
                    </div>}
                </div>

                <div>
                    {sellerLoggedIn && <div className='header_option'>
                        <Link to={PAGEROUTES.SELLERACCOUNT} className='header_sellerSigninLink'>
                            <span className='header_optionLineOne'> Seller </span>
                            <span className='header_optionLineTwo'> Central </span>
                        </Link>
                    </div>}
                    {!sellerLoggedIn && <div className='header_option'>
                        <Link to={PAGEROUTES.SELLERLOGIN} className='header_sellerSigninLink'>
                            <span className='header_optionLineOne'> Seller Account</span>
                            <span className='header_optionLineTwo'> Sign In </span>
                        </Link>
                    </div>}
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
}

export default HeaderBar