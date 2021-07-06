import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';

export default class Trademarks extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const { values, inputChange, handleCheckbox } = this.props;
        return (
            <div>
                <h3>Products</h3>
                <Form>
                    <Form.Group>
                        <Form.Check type='checkbox' onChange={handleCheckbox('upc')} checked={values.upc} label="I have UPC's for all my products" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Check type='checkbox' onChange={handleCheckbox('manufacturer')} checked={values.manufacturer} label="I am the manufacturer or brand owner (or agent or representitive) for any/all of the products you want to sell" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Check type='checkbox' onChange={handleCheckbox('trademark')} checked={values.trademark} label="I own government registered trademarks for the branded products I want to sell" />
                    </Form.Group>
                </Form>
                <Button variant="secondary" onClick={this.back}>Back</Button>
                <Button variant="primary" onClick={this.continue}>Continue</Button>
            </div>
        )
    }
}
