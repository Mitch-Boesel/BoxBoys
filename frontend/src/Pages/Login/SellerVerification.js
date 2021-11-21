import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import './SellerVerification.css'
import { useStateValue } from '../../StateProvider'
import { LOCALSTORAGE_KEYS } from '../../Config/config.json'

function SellerVerification(props) {
    const { values, backendRoutes, pageRoutes, prevStep } = props;

    const [{ loggedIn }, dispatch] = useStateValue();

    const [data, setState] = useState({
        accountCreated: false
    })



    const setSellerCredentials = (val) => {
        dispatch({
            type: "SET_SELLER_CREDENTIALS",
            email: values.email,
            sellerId: val,
            loggedIn: true
        })
        localStorage.setItem(LOCALSTORAGE_KEYS.EMAIL, values.email);
        localStorage.setItem(LOCALSTORAGE_KEYS.SELLERID, val);
    }
    const onSubmit = async (values) => {
        const postUrl = backendRoutes.BASEURL_LOGINSERVICE + backendRoutes.SELLERSIGNUP;
        const bodyData = JSON.stringify(buildPostDataJson(values));
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: bodyData
        }
        const response = await fetch(postUrl, requestOptions);
        const responseData = await response.text();

        if (response.status === 400) {
            window.alert(responseData);
        }
        else if (response.status === 200) {
            window.alert("Account Creation Successful!");
            setSellerCredentials(responseData);
            setState({ accountCreated: true })
        }
    }

    const buildPostDataJson = () => {
        const json = {
            "name": values.name.toString(),
            "businessType": values.businessType.toString(),
            "address": values.address.toString(),
            "city": values.city.toString(),
            "state": values.state.toString(),
            "zipcode": values.zipcode.toString(),
            "phone": values.phone.toString(),
            "email": values.email.toString(),
            "ein": values.ein.toString(),
            "upc": values.upc.toString(),
            "manufacturer": values.manufacturer.toString(),
            "trademark": values.trademark.toString(),
            "verificationDoc": values.verificationDoc.toString(),
            "contactFirstname": values.contactFirstname.toString(),
            "contactLastname": values.contactLastname.toString(),
            "contactDob": values.contactDob.toString(),
            "idType": values.idType.toString(),
            "idFront": values.idFront.toString(),
            "idBack": values.idBack.toString(),
            "owner": values.owner.toString(),
            "password": values.password.toString(),
            "bankInstitution": values.bankInstitution.toString(),
            "bankCountry": values.bankCountry.toString(),
            "bankHoldername": values.bankHoldername.toString(),
            "bankRoutingnum": values.bankRoutingnum.toString(),
            "bankAccNum": values.bankAccnum.toString()
        }

        return json;
    }

    const back = e => {
        e.preventDefault();
        prevStep();
    };

    return (
        <div>
            {!data.accountCreated &&
                <div className="verfication">
                    <h3 className="verfication_header">Verify Information</h3>
                    <div className="verification_pair">
                        <p className='verification_item1'>Business Type:</p>
                        <b className='verification_item2'> {values.businessType}</b>
                    </div>
                    <div className="verification_pair">
                        <p className='verification_item1'>Business Name:</p>
                        <b className='verification_item2'> {values.name}</b>
                    </div>
                    <div className="verification_pair">
                        <p className='verification_item1'>Business EIN:</p>
                        <b className='verification_item2'> {values.ein}</b>
                    </div>
                    <div className="verification_pair">
                        <p className='verification_item1'>Address:</p>
                        <b className='verification_item2'> {values.address}</b>
                    </div>
                    <div className="verification_pair">
                        <p className='verification_item1'>City:</p>
                        <b className='verification_item2'> {values.city}</b>
                    </div>
                    <div className="verification_pair">
                        <p className='verification_item1'>State:</p>
                        <b className='verification_item2'> {values.state}</b>
                    </div>
                    <div className="verification_pair">
                        <p className='verification_item1'>Zip Code:</p>
                        <b className='verification_item2'> {values.zipcode}</b>
                    </div>
                    <div className="verification_pair">
                        <p className='verification_item1'>Primary Contact Firstname:</p>
                        <b className='verification_item2'> {values.contactFirstname}</b>
                    </div>
                    <div className="verification_pair">
                        <p className='verification_item1'>Primary Contact Lastname:</p>
                        <b className='verification_item2'> {values.contactLastname}</b>
                    </div>
                    <div className="verification_pair">
                        <p className='verification_item1'>Primary Contact DOB:</p>
                        <b className='verification_item2'> {values.contactDob}</b>
                    </div>
                    <div className="verification_pair">
                        <p className='verification_item1'>Contact Email:</p>
                        <b className='verification_item2'> {values.email}</b>
                    </div>
                    <div className="verification_pair">
                        <p className='verification_item1'>Contact Phone Number:</p>
                        <b className='verification_item2'> {values.phone}</b>
                    </div>

                    <div className="verification_pair">
                        <p className='verification_item1'>Is The Primary Contact the Owner?:</p>
                        <b className='verification_item2'> {values.name && "Yes"}{!values.name && "No"}</b>
                    </div>
                    <div className="verification_pair">
                        <p className='verification_item1'>Bank Instituion:</p>
                        <b className='verification_item2'> {values.bankInstitution}</b>
                    </div>
                    <div className="verification_pair">
                        <p className='verification_item1'>Bank Country:</p>
                        <b className='verification_item2'> {values.bankCountry}</b>
                    </div>
                    <div className="verification_pair">
                        <p className='verification_item1'>Bank Accountholder Name:</p>
                        <b className='verification_item2'> {values.bankHoldername}</b>
                    </div>
                    <div className="verification_pair">
                        <p className='verification_item1'>Bank Routing Number:</p>
                        <b className='verification_item2'> {values.bankRoutingnum}</b>
                    </div>
                    <div className="verification_pair">
                        <p className='verification_item1'>Bank Account Number:</p>
                        <b className='verification_item2'> {values.bankAccnum}</b>
                    </div>
                    <div className="verification_pair">
                        <p className='verification_item1'>Does Your Business Have UPC's For All Your Products?:</p>
                        <b className='verification_item2'>{values.upc && "Yes"}{!values.upc && "No"}</b>
                    </div>
                    <div className="verification_pair">
                        <p className='verification_item1'>Is Your Company The Manufacturer Or Brand Owner Of Any Of Your Products?:</p>
                        <b className='verification_item2'>{values.manufacturer && "Yes"}{!values.manufacturer && "No"}</b>
                    </div>
                    <div className="verification_pair">
                        <p className='verification_item1'>Do You Own Government Registered Trademarks For The Branded Products You Want To Sell?:</p>
                        <b className='verification_item2'>{values.trademark && "Yes"}{!values.trademark && "No"}</b>
                    </div>
                    <div className="verification_buttons">
                        <Button className="verification_back" variant="secondary" onClick={back}>Back</Button>
                        <Button className='verification_submit' variant="primary" onClick={onSubmit}>Submit</Button>
                    </div>

                </div>}
            {data.accountCreated && <Redirect to={pageRoutes.SELLERACCOUNT} />}
        </div>
    )
}
export default SellerVerification;