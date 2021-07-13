import React, { Component } from 'react'
import { Form, Button, FormControl } from 'react-bootstrap';

export default class SellerContact extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        debugger;
        const { values, inputChange, handleCheckbox } = this.props;
        return (
            <div>
                <h3>Seller Information</h3>
                <Form>
                    <Form.Group>
                        <Form.Label>Primary Contact Person (First, Last)</Form.Label>
                        <Form.Control type='text' onChange={inputChange('contactName')} value={values.contactName} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type='date' onChange={inputChange('contactDob')} value={values.contactDob} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Check type='checkbox' onChange={handleCheckbox('owner')} checked={values.owner} label="Owner or Company Representitive?" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type='text' placeholder='111-111-1111' onChange={inputChange('phone')} value={values.phone} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Account Email</Form.Label>
                        <Form.Control type='email' placeholder='name@example.com' onChange={inputChange('email')} value={values.email} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Account Password</Form.Label>
                        <Form.Control type="password" placeholder='Password' onChange={inputChange('password')} />
                    </Form.Group>
                </Form>

                <Button variant="secondary" onClick={this.back}>Back</Button>
                <Button variant="primary" onClick={this.continue}>Continue</Button>
            </div>
        );
    }
}