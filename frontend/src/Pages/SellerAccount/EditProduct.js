import React, { useState, useEffect } from 'react'
import './EditProduct.css'
import SellerHeaderBar from '../../Components/SellerHeaderBar'
import { useStateValue } from '../../StateProvider'
import { Redirect } from 'react-router-dom';
import { PAGEROUTES, BACKENDROUTES, VALIDATE } from '../../Config/config.json';


function EditProduct() {
    const [{ loggedIn, sellerId }, dispatch] = useStateValue();
    const [data, setState] = useState({
        numProducts: ""
    })


    useEffect(() => {
        (async () => {
            getNumberOfProducts();
        })()
    });
    const getNumberOfProducts = async () => {
        debugger;
        const getUrl = BACKENDROUTES.BASEURL_ACCOUNTSERVICE + BACKENDROUTES.NUMBER_OF_PRODUCTS + `?sellerid=${sellerId}`;
        const response = await fetch(getUrl);

        const responseData = await response.text();

        if (response.status == 400) {
            window.alert(responseData);
            setState({ ...data, numProducts: "Error On Retrival" })
        }
        else if (response.status == 200) {
            setState({ ...data, numProducts: responseData })
        }
    }
    return (
        <div>
            {loggedIn &&
                <div>
                    <SellerHeaderBar />
                    Number of Products Uploaded={data.numProducts}
                </div>
            }
            {!loggedIn && <Redirect to={PAGEROUTES.HOMEPAGE} />}
        </div >
    )
}

export default EditProduct
