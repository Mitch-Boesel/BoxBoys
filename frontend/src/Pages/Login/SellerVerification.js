import React, { Component } from 'react'
import { Form, Button, Row } from 'react-bootstrap';
export default class SellerVerification extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const { values } = this.props;
        return (
            <div>
                <h3>Verification</h3>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Business Type:
                        </Form.Label>
                        <Form.Control plaintext readOnly value={values.businessType} />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Business Name:
                        </Form.Label>
                        <Form.Control plaintext readOnly value={values.businessName} />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Business EIN:
                        </Form.Label>
                        <Form.Control plaintext readOnly value={values.ein} />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Address:
                        </Form.Label>
                        <Form.Control plaintext readOnly value={values.address} />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            City:
                        </Form.Label>
                        <Form.Control plaintext readOnly value={values.city} />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            State:
                        </Form.Label>
                        <Form.Control plaintext readOnly value={values.state} />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            ZipCode:
                        </Form.Label>
                        <Form.Control plaintext readOnly value={values.zipcode} />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Primary Contact Firstname:
                        </Form.Label>
                        <Form.Control plaintext readOnly value={values.contactFirstname} />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Primary Contact contactLastname:
                        </Form.Label>
                        <Form.Control plaintext readOnly value={values.contactLastname} />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Primary Contact DOB:
                        </Form.Label>
                        <Form.Control plaintext readOnly value={values.primaryDob} />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Is Primary Contact the owner?:
                        </Form.Label>
                        <Form.Control plaintext readOnly value={values.owner} />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Bank Institution:
                        </Form.Label>
                        <Form.Control plaintext readOnly value={values.bankInstitution} />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Bank Country:
                        </Form.Label>
                        <Form.Control plaintext readOnly value={values.bankCountry} />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Accountholder Name:
                        </Form.Label>
                        <Form.Control plaintext readOnly value={values.bankHoldername} />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Bank Routing Number:
                        </Form.Label>
                        <Form.Control plaintext readOnly value={values.bankRoutingnum} />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Bank Account Number:
                        </Form.Label>
                        <Form.Control plaintext readOnly value={values.bankAccnum} />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Does your business have UPC's for all your products?:
                        </Form.Label>
                        <Form.Control plaintext readOnly value={values.upc} />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Is your company the manufacturer or brand owner of any of your products?:
                        </Form.Label>
                        <Form.Control plaintext readOnly value={values.manufacturer} />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Do you own government registered trademarks for the branded products you want to sell?:
                        </Form.Label>
                        <Form.Control plaintext readOnly value={values.trademark} />
                    </Form.Group>
                </Form>
                <Button variant="secondary" onClick={this.back}>Back</Button>
                <Button variant="primary" onClick={this.continue}>Continue</Button>
            </div>
        )
    }
}
