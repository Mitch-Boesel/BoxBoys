import React, { Component } from 'react'
import { Form, Button, Row } from 'react-bootstrap';
import axios from "axios";
export default class SellerVerification extends Component {
    /*continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };*/

    async onSubmit(backendRoutes, values) {
        //e.preventDefault();
        const postUrl = backendRoutes.BASEURL + backendRoutes.SELLERSIGNUP;
        const bodyData = JSON.stringify(this.buildPostDataJson(values));
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: bodyData
        }
        const response = await fetch(postUrl, requestOptions);
        const data = await response.json();
        if (response.status == 400) {
            window.alert(data.errors + "ERROR")
        }
        /*
        const bodyData = JSON.stringify(values);
        const response = await axios.post(postUrl, bodyData, {
            headers: { 'Content-Type': 'application/json' }//, 'Content-Length': JSON.stringify(bodyData).length }
        });
        debugger;
        if (response.status == 200) {
            alert(response.data);
            console.log(response.data);
        }
        else {
            alert(response.data);
        }
*/
    }

    buildPostDataJson(values) {
        /*
        const today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var todayString = mm + '/' + dd + '/' + yyyy;
        
            name,
            businessType,
            address,
            city,
            state,
            zipcode,
            phone,
            email,
            ein,
            upc,
            manufacturer,
            trademark,
            verificationDoc,
            contactName,
            contactDob,
            idType,
            idFront,
            idBack,
            owner,
            password,
            bankInstitution,
            bankCountry,
            bankHoldername,
            bankRoutingnum,
            bankAccnum*/
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

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const { values, backendRoutes } = this.props;
        debugger;
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
                        <Form.Control plaintext readOnly value={values.name} />
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
                            Primary Contact Lastname:
                        </Form.Label>
                        <Form.Control plaintext readOnly value={values.contactLastname} />
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="2">
                            Primary Contact DOB:
                        </Form.Label>
                        <Form.Control plaintext readOnly value={values.contactDob} />
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
                <Button variant="primary" onClick={() => this.onSubmit(backendRoutes, values)}>Submit</Button>
            </div>
        )
    }
}
