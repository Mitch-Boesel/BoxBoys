import React from 'react'
import { Form, Button } from 'react-bootstrap';
import CountrySelect from 'react-bootstrap-country-select';
import './BankingInformation.css'

function BankingInformation(props) {
    const { values, inputChange, handleCountry, maxLengths, validateInteger } = props;

    const Continue = values => e => {
        e.preventDefault();
        if (validate(values))
            props.nextStep();
        else
            window.alert("Form is invalid, please correct errors")
    };

    const validate = values => {
        if (values.validate == true)
            return ((values.bankInstitution.length != 0 &&
                values.bankCountry.length != 0 &&
                values.bankHoldername.length != 0 &&
                values.bankRoutingnum.length == 9 &&
                values.bankAccnum.length != 0 &&
                validateInteger(values.bankAccnum) &&
                validateInteger(values.bankRoutingnum)) ? true : false);
        else
            return true;
    }

    const back = e => {
        e.preventDefault();
        props.prevStep();
    };

    return (
        <div>
            <h3 className="banking_header">Banking Information</h3>
            <Form>
                <Form.Group className="banking_pair">
                    <Form.Label>Banking Institution</Form.Label>
                    <Form.Control type='text' placeholder="Bank of America, Wells Fargo, etc." onChange={inputChange('bankInstitution')} value={values.bankInstitution} maxLength={maxLengths.INSTITUTION} />
                    {values.bankInstitution.length == 0 && <span className='errorMessage'>bank name can't be blank</span>}
                </Form.Group>
                <Form.Group className="banking_pair">
                    <Form.Label>Country</Form.Label>
                    <CountrySelect onChange={handleCountry('bankCountry')} value={values.bankCountry} flag={true} valueAs='id' />
                    {values.bankCountry.length == 0 && <span className='errorMessage'>bank country can't be blank</span>}
                </Form.Group>
                <Form.Group className="banking_pair">
                    <Form.Label>Account Holders Name</Form.Label>
                    <Form.Control type='text' onChange={inputChange('bankHoldername')} value={values.bankHoldername} maxLength={maxLengths.HOLDERNAME} />
                    {values.bankHoldername.length == 0 && <span className='errorMessage'>bankholder name can't be blank</span>}
                </Form.Group>
                <Form.Group className="banking_pair">
                    <Form.Label>9-Digit Routing Number</Form.Label>
                    <Form.Control type='text' onChange={inputChange('bankRoutingnum')} value={values.bankRoutingnum} />
                    {values.bankRoutingnum.length != 9 && <span className='errorMessage'>routing number must be 9 digits</span>}
                </Form.Group>
                <Form.Group className="banking_pair">
                    <Form.Label>Bank Account Number</Form.Label>
                    <Form.Control type='text' onChange={inputChange('bankAccnum')} value={values.bankAccnum} />
                    {values.bankAccnum.length == 0 && <span className='errorMessage'>account number can't be blank</span>}
                </Form.Group>
            </Form>
            <Button className="banking_back" variant="secondary" onClick={back}>Back</Button>
            <Button variant="primary" onClick={Continue(values)}>Continue</Button>
        </div>
    )
}
export default BankingInformation;
