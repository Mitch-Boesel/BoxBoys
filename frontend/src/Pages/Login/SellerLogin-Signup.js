import React from 'react';
import BusinessInfo from './BusinessInfo';
import SellerContact from './SellerContact';
import BankInfo from './BankInfo';
import Trademarks from './Trademarks'
import SellerVerification from './SellerVerification'

class SellerLoginSignup extends React.Component {
    state = {
        step: 1,
        name: '',
        businessType: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        phone: '',
        email: '',
        ein: '',
        upc: false,
        manufacturer: false,
        trademark: false,
        verificationDoc: '',
        creationDate: '',
        contactFirstname: '',
        contactLastname: '',
        primaryDob: '',
        idType: '',
        idFront: '',
        idBack: '',
        owner: false,
        primaryEmail: '',
        password: '',
        bankInstitution: '',
        bankCountry: '',
        bankHoldername: '',
        bankRoutingnum: 0,
        bankAccnum: 0
    };

    nextStep = () => {
        const { step } = this.state;
        this.setState({ step: step + 1 });
    };

    prevStep = () => {
        const { step } = this.state;
        this.setState({ step: step - 1 });
    };

    inputChange = input => e => {
        this.setState({
            [input]: e.target.value
        });
    };

    handleCountry = input => e => {
        this.setState({
            [input]: e
        });
    };

    handleCheckbox = input => e => {
        this.setState({
            [input]: e.target.checked
        });
        /*
        const current = this.state[input];
        if (current) {
            this.setState({ [input]: false })
        }
        else {
            this.setState({ [input]: true })
        }
        */
    }
    render() {
        const { step } = this.state;
        const { name,
            businessType,
            address,
            phone,
            email,
            ein,
            upc,
            manufacturer,
            trademark,
            verificationDoc,
            creationDate,
            contactFirstname,
            contactLastname,
            primaryDob,
            idType,
            idFront,
            idBack,
            owner,
            primaryEmail,
            password,
            bankInstitution,
            bankCountry,
            bankHoldername,
            bankRoutingnum,
            bankAccnum } = this.state;
        const values = {
            name,
            businessType,
            address,
            phone,
            email,
            ein,
            upc,
            manufacturer,
            trademark,
            verificationDoc,
            creationDate,
            contactFirstname,
            contactLastname,
            primaryDob,
            idType,
            idFront,
            idBack,
            owner,
            primaryEmail,
            password,
            bankInstitution,
            bankCountry,
            bankHoldername,
            bankRoutingnum,
            bankAccnum
        };

        switch (step) {
            case 1:
                return (
                    <BusinessInfo
                        nextStep={this.nextStep}
                        inputChange={this.inputChange}
                        values={values}
                    />
                )
            case 2:
                return (
                    <SellerContact
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        inputChange={this.inputChange}
                        handleCheckbox={this.handleCheckbox}
                        values={values}
                    />
                )
            case 3:
                return (
                    <BankInfo
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        inputChange={this.inputChange}
                        handleCountry={this.handleCountry}
                        values={values}
                    />
                )
            case 4:
                return (
                    <Trademarks
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        inputChange={this.inputChange}
                        handleCheckbox={this.handleCheckbox}
                        values={values}
                    />
                )
            case 5:
                return (
                    <SellerVerification
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        inputChange={this.inputChange}
                        values={values}
                    />
                )
        }

    }
}

export default SellerLoginSignup;