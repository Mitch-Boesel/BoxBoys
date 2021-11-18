import React, { useState, useEffect } from 'react';
import './EditProductModal.css';
import ProductForm from './ProductForm';

function EditProductModal(props) {

    const [data, setState] = useState({
        productid: props.productInfo.productid,
        category: props.productInfo.category,
        title: props.productInfo.title,
        brand: props.productInfo.brand,
        manufacturer: props.productInfo.manufacturer,
        style: props.productInfo.style,
        size: props.productInfo.size,
        price: props.productInfo.price,
        quantity: props.productInfo.quantity,
        condition: props.productInfo.condition,
        description: props.productInfo.description,
        address: props.productInfo.address,
        city: props.productInfo.city,
        state: props.productInfo.state,
        zipcode: props.productInfo.zipcode,
        buyerpickup: (typeof props.productInfo.buyerpickup) === "boolean" ? props.productInfo.buyerpickup : (props.productInfo.buyerpickup.toLowerCase() === 'true'),
        location: props.productInfo.location
    });

    const toggleOff = div => e => {
        if (div === "overlay") {
            e.preventDefault();
            props.handleScroll();
            props.toggle();
        }
        else if (div === "inner")
            e.stopPropagation();
    }


    function inputChange(key, val) {
        setState({ ...data, [key]: val })
    }

    function handleCheckbox(key, val) {
        setState({ ...data, [key]: val })
    };

    const onSubmit = () => {
        debugger;
        props.submitUpdate(data);
    }

    useEffect(() => {
        (() => {
            props.handleScroll();
        })()
    }, []);


    return (
        <div className="edit_product_modal">
            <div className='edit_product_modal_overlay' onClick={toggleOff("overlay")}>
                <div className="edit_product_modal_contents" onClick={toggleOff("inner")}>
                    <h3 className="edit_product_modal_title">Edit Product </h3>
                    <ProductForm data={data}
                        addressCheckbox={false}
                        onChange={inputChange}
                        onChecked={handleCheckbox}
                        submit={onSubmit}
                        buttonText="Update"
                        buttonVariant="success" />
                </div>
            </div>
        </div>
    )
}

export default EditProductModal
