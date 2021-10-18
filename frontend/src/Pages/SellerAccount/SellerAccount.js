import React, { useEffect } from 'react'
import { useStateValue } from '../../StateProvider'
import { Redirect } from 'react-router-dom';
import SellerHeaderBar from '../../Components/SellerHeaderBar';
import { PAGEROUTES, BACKENDROUTES } from '../../Config/config.json'

function SellerAccount() {
    const [{ email, sellerId, sellerLoggedIn }, dispatch] = useStateValue();

    return (
        <div>
            {sellerLoggedIn &&
                <div>
                    <SellerHeaderBar />
                    <div>SellerId={sellerId}</div>
                </div>
            }
            {!sellerLoggedIn && <Redirect to={PAGEROUTES.HOMEPAGE} />}
        </div>

    )
}

export default SellerAccount;

/*
        <div>
            {loggedIn &&
                <div>
                    <SellerHeaderBar />
                    <div>SellerId={sellerId}</div>
                </div>
            }
            {!loggedIn && <Redirect to={PAGEROUTES.HOMEPAGE} />}

*/