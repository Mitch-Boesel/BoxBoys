import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import ProductCard from './ProductCard';
import EditProductModal from './EditProductModal';
import { BACKENDROUTES, VALIDATE } from '../Config/config.json';
import './EditProductRow.css'

function EditProductRow(props) {

    // data is product info
    const [data, setState] = useState({
        productInfo: props.prodInfo,
        modal: false
    })

    const toggleModal = () => {
        const current = data.modal;
        setState({ ...data, modal: !current })
    }

    const submitUpdate = async d => {
        debugger;
        if (validate(d)) {
            const postUrl = BACKENDROUTES.BASEURL_ACCOUNTSERVICE + BACKENDROUTES.UPDATE_SELLER_PRODUCT;
            const bodyData = JSON.stringify(buildPostDataJson(d));
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: bodyData
            }
            const response = await fetch(postUrl, requestOptions);
            const responseData = await response.text();

            if (response.status === 400) {
                window.alert(responseData);
            }
            else if (response.status === 200) {
                window.alert("Product Was Successfully Updated!");
                toggleModal();
                props.handleScroll();
                setState({ productInfo: d });
            }
        }
        else
            window.alert("Form is invalid, please correct errors")

    }

    const validateInteger = val => {
        return !isNaN(val)
    };

    const validate = (d) => {
        if (VALIDATE === true)
            return (d.category.length !== 0 &&
                d.title.length !== 0 &&
                d.brand.length !== 0 &&
                d.manufacturer.length !== 0 &&
                d.style.length !== 0 &&
                d.size.length !== 0 &&
                d.price.length !== 0 &&
                d.quantity.length !== 0 &&
                d.condition.length !== 0 &&
                d.description.length !== 0 &&
                validateInteger(d.quantity) &&
                validateInteger(d.price) &&
                validateInteger(d.zipcode))
        return true;
    }

    const buildPostDataJson = (d) => {
        const json = {
            "productid": d.productid.toString(),
            "category": d.category.toString(),
            "title": d.title.toString(),
            "brand": d.brand.toString(),
            "manufacturer": d.manufacturer.toString(),
            "style": d.style.toString(),
            "size": d.size.toString(),
            "price": d.price.toString(),
            "quantity": d.quantity.toString(),
            "condition": d.condition.toString(),
            "buyerpickup": d.buyerPickup.toString(),
            "description": d.description.toString(),
            "address": d.address.toString(),
            "city": d.city.toString(),
            "state": d.state.toString(),
            "zipcode": d.zipcode.toString(),
        }
        return json;
    }


    return (
        <div>
            {!data.modal &&
                <div className="seller_product_row">

                    <div className="seller_product_edit">
                        <Button className="edit_button" variant="primary" onClick={toggleModal}>Edit</Button>
                    </div>

                    <ProductCard title={data.productInfo["title"]}
                        brand={data.productInfo["brand"]}
                        manufacturer={data.productInfo["manufacturer"]}
                        size={data.productInfo["size"]}
                        style={data.productInfo["style"]}
                        condition={data.productInfo["condition"]}
                        buyerPickup={data.productInfo["buyerpickup"]}
                        price={data.productInfo["price"]}
                        quantity={data.productInfo["quantity"]}
                        unit={data.productInfo["unit"]}
                        location={data.productInfo["location"]} />
                </div>
            }
            {data.modal && <EditProductModal toggle={toggleModal}
                productInfo={data.productInfo}
                handleScroll={props.handleScroll}
                submitUpdate={submitUpdate} />}
        </div>

    )
}

export default EditProductRow;
