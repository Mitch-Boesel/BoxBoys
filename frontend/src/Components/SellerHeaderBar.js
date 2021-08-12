import React from 'react'
import './SellerHeaderBar.css'
import { useStateValue } from '../StateProvider'


function SellerHeaderBar() {
    const [{ email }, dispatch] = useStateValue();

    return (
        <div className="sellerheader">

            <div className="sellerheader_imgSlogan">
                <strong className="sellerheader_homeLink">Box Boys</strong>
                <p className="sellerheader_slogan">Seller Central</p>
            </div>
            <div className="sellerheader_options">
                <div className="sellerheader_option">
                    <span>Add Product</span>
                </div>
                <div className="sellerheader_option">
                    <span>Edit Product</span>
                </div>
                <div className="sellerheader_option">
                    <span>Reports</span>
                </div>
                <div className="sellerheader_option">
                    <span>Orders</span>
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
