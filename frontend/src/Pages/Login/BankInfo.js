import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import CountrySelect from 'react-bootstrap-country-select';

export default class BankInfo extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const { values, inputChange, handleCountry } = this.props;
        return (
            <div>
                <h3>Banking Information</h3>
                <Form>
                    <Form.Group>
                        <Form.Label>Banking Institution</Form.Label>
                        <Form.Control type='text' placeholder="Bank of America, Wells Fargo, etc." onChange={inputChange('bankInstitution')} value={values.bankInstitution} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <CountrySelect onChange={handleCountry('bankCountry')} value={values.bankCountry} flag={true} valueAs='id' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Account Holders Name</Form.Label>
                        <Form.Control type='text' onChange={inputChange('bankHoldername')} value={values.bankHoldername} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>9-Digit Routing Number</Form.Label>
                        <Form.Control type='text' onChange={inputChange('bankRoutingnum')} value={values.bankRoutingnum} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Bank Account Number</Form.Label>
                        <Form.Control type='text' onChange={inputChange('bankAccnum')} value={values.bankAccnum} />
                    </Form.Group>
                </Form>
                <Button variant="secondary" onClick={this.back}>Back</Button>
                <Button variant="primary" onClick={this.continue}>Continue</Button>
            </div>
        )
    }
}
