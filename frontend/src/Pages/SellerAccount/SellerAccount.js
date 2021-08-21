import React from 'react'
import { useStateValue } from '../../StateProvider'
import { Redirect } from 'react-router-dom';
import SellerHeaderBar from '../../Components/SellerHeaderBar';
import { PAGEROUTES, BACKENDROUTES } from '../../Config/config.json'

function SellerAccount() {
    const [{ email, sellerId, loggedIn }, dispatch] = useStateValue();

    return (

        <div>
            {loggedIn &&
                <div>
                    <SellerHeaderBar />
                    <div>SellerId={sellerId}</div>
                </div>
            }
            {!loggedIn && <Redirect to={PAGEROUTES.HOMEPAGE} />}
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