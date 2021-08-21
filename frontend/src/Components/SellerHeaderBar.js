import React from 'react'
import './SellerHeaderBar.css'
import { useStateValue } from '../StateProvider'
import { Link } from 'react-router-dom';
import { PAGEROUTES } from '../Config/config.json'


function SellerHeaderBar() {
    const [{ email }, dispatch] = useStateValue();

    return (
        <div className="sellerheader">

            <div className="sellerheader_imgSlogan">
                <Link to={PAGEROUTES.SELLERACCOUNT} className="sellerheader_link">
                    <strong className="sellerheader_homeLink">Box Boys</strong>
                    <p className="sellerheader_slogan">Seller Central</p>
                </Link>
            </div>
            <div className="sellerheader_options">
                <div className="sellerheader_option">
                    <Link to={PAGEROUTES.ADDPRODUCT} className="sellerheader_link">
                        <span >Add Product</span>
                    </Link>
                </div>
                <div className="sellerheader_option">
                    <Link to={PAGEROUTES.EDITPRODUCT} className="sellerheader_link">
                        <span>Edit Product</span>
                    </Link>
                </div>
                <div className="sellerheader_option">
                    <Link to={PAGEROUTES.SELLERREPORTS} className="sellerheader_link">
                        <span>Reports</span>
                    </Link>
                </div>
                <div className="sellerheader_option">
                    <Link to={PAGEROUTES.SELLERORDERS} className="sellerheader_link">
                        <span>Orders</span>
                    </Link>
                </div>
            </div>
            <div className="sellerheader_account">
                <span>Logged in as: {email}</span>
            </div>
        </div>
    )
}

export default SellerHeaderBar;
//             <div className="sellerheader_slogan">Seller Central</div>
