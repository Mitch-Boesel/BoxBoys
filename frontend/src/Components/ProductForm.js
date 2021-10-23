import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { PRODUCT_CONFIG } from '../Config/config.json';
import './ProductForm.css'
// Must be passed data (productInfo), an onChange function, an onChecked function, and an onSubmit function
function ProductForm(props) {

    const [data, setState] = useState({
        category: props.data.category,
        title: props.data.title,
        brand: props.data.brand,
        manufacturer: props.data.manufacturer,
        style: props.data.style,
        size: props.data.size,
        price: props.data.price,
        quantity: props.data.quantity,
        condition: props.data.condition,
        description: props.data.description,
        address: props.data.address,
        city: props.data.city,
        state: props.data.state,
        zipcode: props.data.zipcode,
        buyerPickup: props.data.buyerPickup,
        sameAddress: false
    });

    const inputChange = input => e => {
        setState({ ...data, [input]: e.target.value })
        props.onChange(input, e.target.value);
    };

    const handleCheckbox = input => e => {
        setState({ ...data, [input]: e.target.checked })
        props.onChecked(input, e.target.checked);
    };

    const onSubmit = e => {
        e.preventDefault();
        props.submit();

    }
    return (
        <Form>
            <Form.Group className="product_inputPair">
                <Form.Label className="product_inputLabel">Title:</Form.Label>
                <Form.Control type="text" onChange={inputChange('title')} value={data.title} className="product_inputValue" maxLength={PRODUCT_CONFIG.MAX_LENGTH.TITLE}></Form.Control>
            </Form.Group>
            <Form.Group className="product_inputPair" >
                <Form.Label className="product_inputLabel">Category:</Form.Label>
                <Form.Control as='select' onChange={inputChange('category')} value={data.category} className="product_inputValue">
                    {PRODUCT_CONFIG.CATEGORIES.map(name => (
                        <option>{name}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group className="product_inputPair">
                <Form.Label className="product_inputLabel">Brand:</Form.Label>
                <Form.Control type="text" onChange={inputChange('brand')} value={data.brand} className="product_inputValue" maxLength={PRODUCT_CONFIG.MAX_LENGTH.BRAND}></Form.Control>
            </Form.Group>
            <Form.Group className="product_inputPair">
                <Form.Label className="product_inputLabel">Manufacturer:</Form.Label>
                <Form.Control type="text" onChange={inputChange('manufacturer')} value={data.manufacturer} className="product_inputValue" maxLength={PRODUCT_CONFIG.MAX_LENGTH.MANUFACTURER}></Form.Control>
            </Form.Group>
            <Form.Group className="product_inputPair">
                <Form.Label className="product_inputLabel">Style:</Form.Label>
                <Form.Control type="text" onChange={inputChange('style')} value={data.style} className="product_inputValue" maxLength={PRODUCT_CONFIG.MAX_LENGTH.STYLE}></Form.Control>
            </Form.Group>
            <Form.Group className="product_inputPair">
                <Form.Label className="product_inputLabel">Size:</Form.Label>
                <Form.Control type="text" onChange={inputChange('size')} value={data.size} className="product_inputValue" maxLength={PRODUCT_CONFIG.MAX_LENGTH.SIZE}></Form.Control>
            </Form.Group>
            <Form.Group className="product_inputPair">
                <Form.Label className="product_inputLabel">Price:</Form.Label>
                <Form.Control type="text" onChange={inputChange('price')} value={data.price} className="product_inputValue" ></Form.Control>
            </Form.Group>
            <Form.Group className="product_inputPair">
                <Form.Label className="product_inputLabel">Quantity:</Form.Label>
                <Form.Control type="text" onChange={inputChange('quantity')} value={data.quantity} className="product_inputValue"></Form.Control>
            </Form.Group>
            <Form.Group className="product_inputPair">
                <Form.Label className="product_inputLabel">Condition:</Form.Label>
                <Form.Control type="text" onChange={inputChange('condition')} value={data.condition} className="product_inputValue" maxLength={PRODUCT_CONFIG.MAX_LENGTH.CONDITION}></Form.Control>
            </Form.Group>
            <Form.Group className="product_inputPair">
                <Form.Label className="product_inputLabel">Buyer Can Pickup</Form.Label>
                <Form.Check type='checkbox' onChange={handleCheckbox("buyerPickup")} checked={data.buyerPickup} className="product_inputValue" />
            </Form.Group>

            <Form.Group className="product_inputPair">
                <Form.Label className="product_inputLabel">Description:</Form.Label>
                <Form.Control as="textarea" onChange={inputChange('description')} value={data.description} className="product_inputValue" maxLength={PRODUCT_CONFIG.MAX_LENGTH.DESCRIPTION}></Form.Control>
            </Form.Group>
            {props.addressCheckbox &&
                <Form.Group className="product_inputPair">
                    <Form.Label className="product_inputLabel">Same Address as your registered Business Address?</Form.Label>
                    <Form.Check type='checkbox' onChange={handleCheckbox("sameAddress")} checked={data.sameAddress} className="product_inputValue" />
                </Form.Group>}
            {!data.sameAddress && <div>

                <Form.Group className="product_inputPair" >
                    <Form.Label className="product_inputLabel">Address:</Form.Label>
                    <Form.Control type='address' className="product_inputValue" onChange={inputChange('address')} value={data.address} maxLength={PRODUCT_CONFIG.MAX_LENGTH.ADDRESSS}></Form.Control>
                </Form.Group>
                <Form.Group className="product_inputPair">
                    <Form.Label className="product_inputLabel">City</Form.Label>
                    <Form.Control type="text" className="product_inputValue" onChange={inputChange('city')} value={data.city} maxLength={PRODUCT_CONFIG.MAX_LENGTH.CITY} />
                </Form.Group>
                <Form.Group className="product_inputPair" controlId="formGridState">
                    <Form.Label className="product_inputLabel">State</Form.Label>
                    <Form.Control as="select" className="product_inputValue" onChange={inputChange('state')} value={data.state}>
                        <option value=""></option>
                        <option value="AK">Alaska</option>
                        <option value="AL">Alabama</option>
                        <option value="AR">Arkansas</option>
                        <option value="AZ">Arizona</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DC">District of Columbia</option>
                        <option value="DE">Delaware</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="IA">Iowa</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MD">Maryland</option>
                        <option value="ME">Maine</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MO">Missouri</option>
                        <option value="MS">Mississippi</option>
                        <option value="MT">Montana</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="NE">Nebraska</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NV">Nevada</option>
                        <option value="NY">New York</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VA">Virginia</option>
                        <option value="VT">Vermont</option>
                        <option value="WA">Washington</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WV">West Virginia</option>
                        <option value="WY">Wyoming</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="product_inputPair">
                    <Form.Label className="product_inputLabel">Zipcode</Form.Label>
                    <Form.Control className="product_inputValue" onChange={inputChange('zipcode')} value={data.zipcode} />
                </Form.Group>
            </div>
            }
            <div>
                <Button className='product_submit' variant={props.buttonVariant} onClick={onSubmit}>{props.buttonText}</Button>
            </div>
        </Form>

    )
}

export default ProductForm
