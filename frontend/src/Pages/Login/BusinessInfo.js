import React from 'react'
import { Form, Button, Col } from 'react-bootstrap';
import './error.css';
import './BusinessInfo.css'

function BusinessInfo(props) {
    const Continue = values => e => {
        e.preventDefault();
        if (validate(values))
            props.nextStep();
        else
            window.alert("Form is invalid, please correct errors")
    };

    const validate = values => {
        if (values.validate == true)
            return ((values.name.length != 0 &&
                values.ein.length != 0 &&
                values.address.length != 0 &&
                values.city.length != 0 &&
                values.state.length != 0 &&
                values.zipcode.length != 0 &&
                values.state.length != 0 &&
                validateInteger(values.ein) &&
                validateInteger(values.zipcode)) ? true : false);
        else
            return true;
    }

    const { inputChange, maxLengths, validateInteger } = props;
    var { values } = props;
    return (
        <div >
            <h3 className='business_header'>Business Information</h3>
            <Form>
                <Form.Group className="business_pair" controlId='sellersignup-businesstype'>
                    <Form.Label>Business Type:</Form.Label>
                    <Form.Control as='select' onChange={inputChange('businessType')} value={values.businessType} >
                        <option>Private</option>
                        <option>Public</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="business_pair" >
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control type='text' onChange={inputChange('name')} value={values.name} maxLength={maxLengths.NAME} />
                    {values.name.length == 0 && <span className='errorMessage'>Business Name can't be blank</span>}
                </Form.Group>
                <Form.Group className="business_pair" >
                    <Form.Label>Business Registration Number (EIN)</Form.Label>
                    <Form.Control type='text' onChange={inputChange('ein')} value={values.ein}></Form.Control>
                    {values.ein.length == 0 && <span className='errorMessage'>EIN can't be blank</span>}
                </Form.Group>
                <Form.Group className="business_pair" >
                    <Form.Label>Business Address</Form.Label>
                    <Form.Control type='address' onChange={inputChange('address')} value={values.address} maxLength={maxLengths.ADDRESS}></Form.Control>
                    {values.address.length == 0 && <span className='errorMessage'>Address can't be blank</span>}
                </Form.Group>
                <Form.Row>
                    <Form.Group className="business_pair" as={Col}>
                        <Form.Label>City</Form.Label>
                        <Form.Control onChange={inputChange('city')} value={values.city} maxLength={maxLengths.CITY} />
                        {values.city.length == 0 && <span className='errorMessage'>City can't be blank</span>}
                    </Form.Group>
                    <Form.Group className="business_pair" as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select" onChange={inputChange('state')} value={values.state}>
                            <option value=""></option>
                            <option value="AK">Alaska</option>
                            <option value="AL">Alabama</option>
                            <option value="AR">Arkansas</option>
                            <option value="AZ">Arizona</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DC">District of Columbia</option>
                            <option value="DE">Delaware</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="IA">Iowa</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MD">Maryland</option>
                            <option value="ME">Maine</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MO">Missouri</option>
                            <option value="MS">Mississippi</option>
                            <option value="MT">Montana</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="NE">Nebraska</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NV">Nevada</option>
                            <option value="NY">New York</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="PR">Puerto Rico</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VA">Virginia</option>
                            <option value="VT">Vermont</option>
                            <option value="WA">Washington</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WV">West Virginia</option>
                            <option value="WY">Wyoming</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="business_pair" as={Col}>
                        <Form.Label>Zip</Form.Label>
                        <Form.Control onChange={inputChange('zipcode')} value={values.zipcode} />
                        {values.zipcode.length == 0 && <span className='errorMessage'>zipcode can't be blank</span>}
                    </Form.Group>
                </Form.Row>
                <Button className="business_next" variant="primary" onClick={Continue(values)}>Continue</Button>
            </Form>
        </div >
    )
}
export default BusinessInfo;