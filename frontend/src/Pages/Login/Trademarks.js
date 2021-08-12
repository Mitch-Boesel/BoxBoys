import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import './Trademarks.css'
function Trademarks(props) {
    const { values, handleCheckbox } = props;

    const Continue = e => {
        e.preventDefault();
        props.nextStep();
    };

    const back = e => {
        e.preventDefault();
        props.prevStep();
    };

    return (
        <div>
            <h3 className="product_header">Products</h3>
            <Form>
                <Form.Group className="product_checkbox">
                    <Form.Check type='checkbox' onChange={handleCheckbox('upc')} checked={values.upc} label="I have UPC's for all my products" />
                </Form.Group>
                <Form.Group className="product_checkbox">
                    <Form.Check type='checkbox' onChange={handleCheckbox('manufacturer')} checked={values.manufacturer} label="I am the manufacturer or brand owner (or agent or representitive) for any/all of the products you want to sell" />
                </Form.Group>
                <Form.Group className="product_checkbox">
                    <Form.Check type='checkbox' onChange={handleCheckbox('trademark')} checked={values.trademark} label="I own government registered trademarks for the branded products I want to sell" />
                </Form.Group>
            </Form>
            <div className="product_buttons">
                <Button className="product_back" variant="secondary" onClick={back}>Back</Button>
                <Button variant="primary" onClick={Continue}>Continue</Button>
            </div>
        </div>
    )
}
export default Trademarks;