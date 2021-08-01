import React from 'react';
import BusinessInfo from './BusinessInfo';
import SellerContact from './SellerContact';
import BankInfo from './BankInfo';
import Trademarks from './Trademarks'
import SellerVerification from './SellerVerification'
//import Routes from '../../Config/AllRoutes.json';

class SellerLoginSignup extends React.Component {
    state = {
        step: 1,
        name: '',
        businessType: '',
        address: '',
        city: '',
        state: 'ak',
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
        contactDob: '',
        idType: '',
        idFront: '',
        idBack: '',
        owner: false,
        password: '',
        bankInstitution: '',
        bankCountry: '',
        bankHoldername: '',
        bankRoutingnum: 0,
        bankAccnum: 0,
        validate: this.props.validate,
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
    }
    render() {
        //  debugger;
        const BACKENDROUTES = this.props.backendpoints

        const { step } = this.state;
        const { name,
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
            contactFirstname,
            contactLastname,
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
            bankAccnum,
            validate } = this.state;
        const values = {
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
            contactFirstname,
            contactLastname,
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
            bankAccnum,
            validate
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
                        backendRoutes={BACKENDROUTES}
                    />
                )
        }

    }
}

export default SellerLoginSignup;