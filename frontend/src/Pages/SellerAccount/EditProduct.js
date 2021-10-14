import React, { useState, useEffect } from 'react'
import './EditProduct.css'
import SellerHeaderBar from '../../Components/SellerHeaderBar'
import { useStateValue } from '../../StateProvider'
import { Redirect } from 'react-router-dom';
import { PAGEROUTES, BACKENDROUTES } from '../../Config/config.json';
import ProductCard from '../../Components/ProductCard';
import { Button } from 'react-bootstrap';

function EditProduct() {
    const [{ sellerLoggedIn, sellerId }, dispatch] = useStateValue();
    const [data, setState] = useState({
        products: {},
        hasLoaded: false
    })

    /*
        useEffect(() => {
            loadDataOnlyOnce();
          }, []);
    */
    useEffect(() => {
        (async () => {
            getProducts();
        })()
    }, []);

    const getProducts = async () => {
        debugger;
        const getUrl = BACKENDROUTES.BASEURL_SEARCHSERVICE + BACKENDROUTES.GET_SELLER_PRODUCTS + `?sellerid=${sellerId}`;
        const response = await fetch(getUrl);

        const responseData = await response.text();
        debugger;
        if (response.status == 400) {
            window.alert(responseData);
        }
        else if (response.status == 200) {
            setState({ ...data, products: JSON.parse(responseData), hasLoaded: true })
        }
    }

    const renderProducts = () => {
        debugger;
        if (!data.hasLoaded)
            return "empty"
        return Object.keys(data.products.data).map((key) => {
            var obj = data.products.data[key]
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
                        unit={obj["unit"]} />
                </div>
            )
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
