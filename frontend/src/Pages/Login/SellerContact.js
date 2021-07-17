import React, { Component } from 'react'
import { Form, Button, FormControl } from 'react-bootstrap';
import './error.css';

export default class SellerContact extends Component {
    continue = values => e => {
        e.preventDefault();
        if (this.validate(values))
            this.props.nextStep();
        else
            window.alert("Form is invalid, please correct errors")
    }

    validate = values => {
        const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        if (values.validate == true)
            return ((values.contactFirstname.length != 0 &&
                values.contactLastname.length != 0 &&
                values.contactDob.length != 0 &&
                values.phone.length >= 10 &&
                values.phone.length <= 15 &&
                validEmailRegex.test(values.email) &&
                values.password.length >= 8) ? true : false);
        else
            return true;
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        const { values, inputChange, handleCheckbox } = this.props;
        return (
            <div>
                <h3>Seller Information</h3>
                <Form>
                    <Form.Group>
                        <Form.Label>Primary Contact Person First Name</Form.Label>
                        <Form.Control type='text' onChange={inputChange('contactFirstname')} value={values.contactFirstname} />
                        {values.contactFirstname.length == 0 && <span className='errorMessage'>contact first name can't be blank</span>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Primary Contact Person Last Name</Form.Label>
                        <Form.Control type='text' onChange={inputChange('contactLastname')} value={values.contactLastname} />
                        {values.contactLastname.length == 0 && <span className='errorMessage'>contact last name can't be blank</span>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type='date' onChange={inputChange('contactDob')} value={values.contactDob} />
                        {values.contactDob.length == 0 && <span className='errorMessage'>dob can't be blank</span>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Check type='checkbox' onChange={handleCheckbox('owner')} checked={values.owner} label="Owner or Company Representitive?" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type='text' placeholder='111-111-1111' onChange={inputChange('phone')} value={values.phone} />
                        {values.phone.length < 10 && values.phone.length < 15 && <span className='errorMessage'>please enter a valid phone number</span>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Account Email</Form.Label>
                        <Form.Control type='email' placeholder='name@example.com' onChange={inputChange('email')} value={values.email} />
                        {!validEmailRegex.test(values.email) && <span className='errorMessage'>please enter a valid email</span>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Account Password</Form.Label>
                        <Form.Control type="password" placeholder='Password' onChange={inputChange('password')} value={values.password} />
                        {values.password.length < 8 && <span className='errorMessage'>Password must be at least 8 characters</span>}
                    </Form.Group>
                </Form>

                <Button variant="secondary" onClick={this.back}>Back</Button>
                <Button variant="primary" onClick={this.continue(values)}>Continue</Button>
            </div>
        );
    }
}