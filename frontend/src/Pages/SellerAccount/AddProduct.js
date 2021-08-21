import React, { useState } from 'react'
import './AddProduct.css'
import SellerHeaderBar from '../../Components/SellerHeaderBar'
import { Form, Check, Button } from 'react-bootstrap';
import { PAGEROUTES, PRODUCT_CATEGORIES, BACKENDROUTES } from '../../Config/config.json';
import { useStateValue } from '../../StateProvider'
import { Redirect } from 'react-router-dom';

function AddProduct() {
    const [{ loggedIn, sellerId }, dispatch] = useStateValue();

    const [data, setState] = useState({
        category: "",
        title: "",
        brand: "",
        manufacturer: "",
        style: "",
        size: "",
        price: "",
        quantity: "",
        unit: "",
        condition: "",
        fulfillment: "",
        description: "",
        sameAddress: false
    });

    const inputChange = input => e => {
        setState({ ...data, [input]: e.target.value })
    };

    const handleCheckbox = () => {
        const value = data.sameAddress;
        setState({ ...data, sameAddress: !value })
    }

    const onSubmit = async () => {
        //e.preventDefault();
        const postUrl = BACKENDROUTES.BASEURL_ACCOUNTSERVICE + BACKENDROUTES.ADDPRODUCT;
        const bodyData = JSON.stringify(buildPostDataJson());
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: bodyData
        }
        const response = await fetch(postUrl, requestOptions);
        const responseData = await response.text();

        if (response.status == 400) {
            window.alert(responseData);
        }
        else if (response.status == 200) {
            window.alert("New Product Was Successfully Added!");
        }
    }

    const buildPostDataJson = () => {
        const json = {
            "sellerid": sellerId,
            "category": data.category.toString(),
            "title": data.title.toString(),
            "brand": data.brand.toString(),
            "manufacturer": data.manufacturer.toString(),
            "style": data.style.toString(),
            "size": data.size.toString(),
            "price": data.price.toString(),
            "quantity": data.quantity.toString(),
            "unit": data.unit.toString(),
            "condition": data.condition.toString(),
            "fulfillment": data.fulfillment.toString(),
            "description": data.description.toString(),
            "sameAddress": data.sameAddress.toString()
        }
        return json;
    }
    return (
        <div>
            {loggedIn &&
                <div>
                    <SellerHeaderBar />
                    <div className="addproduct">
                        <h3 className="product_title">Add A New product</h3>
                        <Form>
                            <Form.Group className="product_inputPair" >
                                <Form.Label className="product_inputLabel">Category:</Form.Label>
                                <Form.Control as='select' onChange={inputChange('category')} value={data.category} className="product_inputValue">
                                    {PRODUCT_CATEGORIES.map(name => (
                                        <option>{name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="product_inputPair">
                                <Form.Label className="product_inputLabel">Title:</Form.Label>
                                <Form.Control type="text" onChange={inputChange('title')} className="product_inputValue"></Form.Control>
                            </Form.Group>
                            <Form.Group className="product_inputPair">
                                <Form.Label className="product_inputLabel">Brand:</Form.Label>
                                <Form.Control type="text" onChange={inputChange('brand')} className="product_inputValue"></Form.Control>
                            </Form.Group>
                            <Form.Group className="product_inputPair">
                                <Form.Label className="product_inputLabel">Manufacturer:</Form.Label>
                                <Form.Control type="text" onChange={inputChange('manufacturer')} className="product_inputValue"></Form.Control>
                            </Form.Group>
                            <Form.Group className="product_inputPair">
                                <Form.Label className="product_inputLabel">Style:</Form.Label>
                                <Form.Control type="text" onChange={inputChange('style')} className="product_inputValue"></Form.Control>
                            </Form.Group>
                            <Form.Group className="product_inputPair">
                                <Form.Label className="product_inputLabel">Size:</Form.Label>
                                <Form.Control type="text" onChange={inputChange('size')} className="product_inputValue"></Form.Control>
                            </Form.Group>
                            <Form.Group className="product_inputPair">
                                <Form.Label className="product_inputLabel">Price:</Form.Label>
                                <Form.Control type="text" onChange={inputChange('price')} className="product_inputValue"></Form.Control>
                            </Form.Group>
                            <Form.Group className="product_inputPair">
                                <Form.Label className="product_inputLabel">Quantity:</Form.Label>
                                <Form.Control type="text" onChange={inputChange('quantity')} className="product_inputValue"></Form.Control>
                            </Form.Group>
                            <Form.Group className="product_inputPair">
                                <Form.Label className="product_inputLabel">Unit:</Form.Label>
                                <Form.Control type="text" onChange={inputChange('unit')} className="product_inputValue"></Form.Control>
                            </Form.Group>
                            <Form.Group className="product_inputPair">
                                <Form.Label className="product_inputLabel">Condition:</Form.Label>
                                <Form.Control type="text" onChange={inputChange('condition')} className="product_inputValue"></Form.Control>
                            </Form.Group>
                            <Form.Group className="product_inputPair">
                                <Form.Label className="product_inputLabel">Fulfillment:</Form.Label>
                                <Form.Control type="text" onChange={inputChange('fulfillment')} className="product_inputValue"></Form.Control>
                            </Form.Group>
                            <Form.Group className="product_inputPair">
                                <Form.Label className="product_inputLabel">Description:</Form.Label>
                                <Form.Control type="text" onChange={inputChange('description')} className="product_inputValue"></Form.Control>
                            </Form.Group>
                            <Form.Group className="product_inputPair">
                                <Form.Label className="product_inputLabel">"Same Address as your registered Business Address?"</Form.Label>
                                <Form.Check type='checkbox' onChange={handleCheckbox} className="product_inputValue" />
                            </Form.Group>
                            <div>
                                <Button className='product_submit' variant="primary" onClick={onSubmit}>Submit</Button>
                            </div>
                        </Form>
                    </div>

                </div>}
            {!loggedIn && <Redirect to={PAGEROUTES.HOMEPAGE} />}
        </div>
    )
}

export default AddProduct
