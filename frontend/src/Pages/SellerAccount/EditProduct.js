import React, { useState, useEffect } from 'react'
import './EditProduct.css'
import SellerHeaderBar from '../../Components/SellerHeaderBar'
import { useStateValue } from '../../StateProvider'
import { Redirect } from 'react-router-dom';
import { PAGEROUTES, BACKENDROUTES } from '../../Config/config.json';
import EditProductRow from '../../Components/EditProductRow';

function EditProduct() {
    const [{ sellerLoggedIn, sellerId }] = useStateValue();
    const [data, setState] = useState({
        products: {},
        hasLoaded: false,
        modal: false
    })

    useEffect(() => {
        (async () => {
            getProducts();
        })()
    }, []);

    const getProducts = async () => {
        const getUrl = BACKENDROUTES.BASEURL_ACCOUNTSERVICE + BACKENDROUTES.GET_SELLER_PRODUCTS + `?sellerid=${sellerId}`;
        const response = await fetch(getUrl);

        const responseData = await response.text();
        if (response.status === 400) {
            window.alert(responseData);
        }
        else if (response.status === 200) {
            setState({ ...data, products: JSON.parse(responseData), hasLoaded: true })
        }
    }

    const handleScroll = () => {
        const current = data.modal;
        setState({ ...data, modal: !current });
    }

    const renderProducts = () => {
        if (!data.hasLoaded)
            return ""
        return Object.keys(data.products.data).map((key) => {
            var obj = data.products.data[key]
            return (
                <EditProductRow prodInfo={obj} handleScroll={handleScroll} />
            )
            /*
            return (
                <div className="seller_product_row">
                    <div className="seller_product_edit">
                        <Button className="edit_button" variant="danger">Edit</Button>
                    </div>

                    <ProductCard title={obj["title"]}
                        brand={obj["brand"]}
                        manufacturer={obj["manufacturer"]}
                        size={obj["size"]}
                        style={obj["style"]}
                        condition={obj["condition"]}
                        buyerPickup={obj["buyerpickup"]}
                        price={obj["price"]}
                        quantity={obj["quantity"]}
                        unit={obj["unit"]}
                        location={obj["location"]} />
                </div>
            )*/
        });
    }

    /*
        const renderProducts = () => {
            debugger;
            if (!data.hasLoaded)
                return "empty"
            return Object.keys(data.products.data).map((key) => {
                var obj = data.products.data[key]
                return (
                    <ProductCard title={obj["title"]}
                        brand={obj["brand"]}
                        manufacturer={obj["manufacturer"]}
                        size={obj["size"]}
                        style={obj["style"]}
                        condition={obj["condition"]}
                        pickup={obj["pickup"]}
                        price={obj["price"]}
                        quantity={obj["quantity"]}
                        unit={obj["unit"]} />
                )
            });
        }*/
    if (data.modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    return (
        <div>
            {sellerLoggedIn &&
                <div>
                    <div>
                        <SellerHeaderBar />
                    </div>
                    <div className="seller_products">
                        <div className="edit_products_title"> Edit Products</div>

                        {renderProducts()}
                    </div>
                </div>
            }
            {!sellerLoggedIn && <Redirect to={PAGEROUTES.HOMEPAGE} />}
        </div >
    )
}

export default EditProduct
