import React from 'react'
import { Form, Button } from 'react-bootstrap';
import './error.css';
import './SellerContact.css'

function SellerContact(props) {
    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    const { values, inputChange, handleCheckbox } = props;

    const Continue = values => e => {
        e.preventDefault();
        if (validate(values))
            props.nextStep();
        else
            window.alert("Form is invalid, please correct errors")
    }

    const validate = values => {
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

    const back = e => {
        e.preventDefault();
        props.prevStep();
    };


    return (
        <div>
            <h3 className="contact_header">Contact Information</h3>
            <Form>
                <Form.Group className="contact_pair">
                    <Form.Label>Primary Contact Person First Name</Form.Label>
                    <Form.Control type='text' onChange={inputChange('contactFirstname')} value={values.contactFirstname} />
                    {values.contactFirstname.length == 0 && <span className='errorMessage'>contact first name can't be blank</span>}
                </Form.Group>
                <Form.Group className="contact_pair">
                    <Form.Label>Primary Contact Person Last Name</Form.Label>
                    <Form.Control type='text' onChange={inputChange('contactLastname')} value={values.contactLastname} />
                    {values.contactLastname.length == 0 && <span className='errorMessage'>contact last name can't be blank</span>}
                </Form.Group>
                <Form.Group className="contact_pair">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type='date' onChange={inputChange('contactDob')} value={values.contactDob} />
                    {values.contactDob.length == 0 && <span className='errorMessage'>dob can't be blank</span>}
                </Form.Group>
                <Form.Group className="contact_pair">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type='text' placeholder='111-111-1111' onChange={inputChange('phone')} value={values.phone} />
                    {values.phone.length < 10 && values.phone.length < 15 && <span className='errorMessage'>please enter a valid phone number</span>}
                </Form.Group>
                <Form.Group className="contact_pair">
                    <Form.Label>Account Email</Form.Label>
                    <Form.Control type='email' placeholder='name@example.com' onChange={inputChange('email')} value={values.email} />
                    {!validEmailRegex.test(values.email) && <span className='errorMessage'>please enter a valid email</span>}
                </Form.Group>
                <Form.Group className="contact_pair">
                    <Form.Label>Account Password</Form.Label>
                    <Form.Control type="password" placeholder='Password' onChange={inputChange('password')} value={values.password} />
                    {values.password.length < 8 && <span className='errorMessage'>Password must be at least 8 characters</span>}
                </Form.Group>
                <Form.Group className="contact_pair">
                    <Form.Check type='checkbox' onChange={handleCheckbox('owner')} checked={values.owner} label="Owner or Company Representitive?" />
                </Form.Group>
            </Form>

            <Button className="contact_back" variant="secondary" onClick={back}>Back</Button>
            <Button variant="primary" onClick={Continue(values)}>Continue</Button>
        </div>
    );
}

export default SellerContact;