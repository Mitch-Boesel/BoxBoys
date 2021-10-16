import React, { useState } from 'react'
import { Form } from 'react-bootstrap';

import './SearchCriteria.css'

function SearchCriteria() {

    const [data, setState] = useState({
        locationClosest: false,
        lowestPrice: false,
        quantity: false,
        canPickup: false
    });

    const handleCheckbox = input => e => {
        setState({ ...data, [input]: e.target.checked })
    };

    return (
        <div className="search_criteria">
            <Form>
                <Form.Group className="seach_page_checkbox">
                    <Form.Check type='checkbox' onChange={handleCheckbox('locationClosest')} checked={data.locationClosest} label="Closest" />
                </Form.Group>
                <Form.Group className="seach_page_checkbox">
                    <Form.Check type='checkbox' onChange={handleCheckbox('lowestPrice')} checked={data.lowestPrice} label="Lowest Price" />
                </Form.Group>
                <Form.Group className="seach_page_checkbox">
                    <Form.Check type='checkbox' onChange={handleCheckbox('quantity')} checked={data.quantity} label="Highest Quantity" />
                </Form.Group>
                <Form.Group className="seach_page_checkbox">
                    <Form.Check type='checkbox' onChange={handleCheckbox('canPickup')} checked={data.canPickup} label="I Can Pickup" />
                </Form.Group>
            </Form>
        </div>
    )
}

export default SearchCriteria;
