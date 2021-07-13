import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import CountrySelect from 'react-bootstrap-country-select';

export default class BankInfo extends Component {
    continue = values => e => {
        e.preventDefault();
        if (this.validate(values))
            this.props.nextStep();
        else
            window.alert("Form is invalid, please correct errors")
    };

    validate = values => {
        if (values.validate == true)
            return ((values.bankInstitution.length != 0 &&
                values.bankCountry.length != 0 &&
                values.bankHoldername.length != 0 &&
                values.bankRoutingnum.length == 9 &&
                values.bankAccnum.length != 0) ? true : false);
        else
            return true;
    }

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
                        {values.bankInstitution.length == 0 && <span className='errorMessage'>bank name can't be blank</span>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <CountrySelect onChange={handleCountry('bankCountry')} value={values.bankCountry} flag={true} valueAs='id' />
                        {values.bankCountry.length == 0 && <span className='errorMessage'>bank country can't be blank</span>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Account Holders Name</Form.Label>
                        <Form.Control type='text' onChange={inputChange('bankHoldername')} value={values.bankHoldername} />
                        {values.bankHoldername.length == 0 && <span className='errorMessage'>bankholder name can't be blank</span>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>9-Digit Routing Number</Form.Label>
                        <Form.Control type='text' onChange={inputChange('bankRoutingnum')} value={values.bankRoutingnum} />
                        {values.bankRoutingnum.length != 9 && <span className='errorMessage'>routing number must be 9 digits</span>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Bank Account Number</Form.Label>
                        <Form.Control type='text' onChange={inputChange('bankAccnum')} value={values.bankAccnum} />
                        {values.bankAccnum.length == 0 && <span className='errorMessage'>account number can't be blank</span>}
                    </Form.Group>
                </Form>
                <Button variant="secondary" onClick={this.back}>Back</Button>
                <Button variant="primary" onClick={this.continue(values)}>Continue</Button>
            </div>
        )
    }
}
