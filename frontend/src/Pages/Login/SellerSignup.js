import React, { useState } from 'react';
import BusinessInfo from './BusinessInfo';
import SellerContact from './SellerContact';
import BankInfo from './BankInfo';
import Trademarks from './Trademarks'
import SellerVerification from './SellerVerification'
import config from '../../Config/config.json'
import './SellerSignup.css'


function SellerSignup() {
    const [data, setState] = useState({
        step: 1,
        name: '',
        businessType: 'Private',
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
        validate: config.VALIDATE
        //accountCreated: false
    });


    const nextStep = () => {
        const { step } = data
        setState({ ...data, step: step + 1 })
    };

    const prevStep = () => {
        const { step } = data
        setState({ ...data, step: step - 1 })
    };

    const inputChange = input => e => {
        setState({ ...data, [input]: e.target.value })
    };

    /*   const setAccountCreated = () => {
           setState({ ...data, accountCreated: true })
     }*/

    const handleCountry = input => e => {
        setState({ ...data, [input]: e })
    };

    const validateInteger = val => {
        return !isNaN(val)
    };


    const switchToPage = () => {
        const { step } = data;
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
            validate
            //accountCreated 
        } = data;
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
            //accountCreated
        };
        switch (step) {
            case 1:
                return (
                    <BusinessInfo
                        nextStep={nextStep}
                        inputChange={inputChange}
                        maxLengths={config.SELLER_SIGNUP_CONFIG.MAX_LENGTH}
                        validateInteger={validateInteger}
                        values={values}
                    />
                )
            case 2:
                return (
                    <SellerContact
                        nextStep={nextStep}
                        prevStep={prevStep}
                        inputChange={inputChange}
                        handleCheckbox={handleCheckbox}
                        maxLengths={config.SELLER_SIGNUP_CONFIG.MAX_LENGTH}
                        values={values}
                    />
                )
            case 3:
                return (
                    <BankInfo
                        nextStep={nextStep}
                        prevStep={prevStep}
                        inputChange={inputChange}
                        handleCountry={handleCountry}
                        validateInteger={validateInteger}
                        maxLengths={config.SELLER_SIGNUP_CONFIG.MAX_LENGTH}
                        values={values}
                    />
                )
            case 4:
                return (
                    <Trademarks
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleCheckbox={handleCheckbox}
                        values={values}
                    />
                )
            case 5:
                return (
                    <SellerVerification
                        //setAccountCreated={setAccountCreated}
                        prevStep={prevStep}
                        values={values}
                        backendRoutes={config.BACKENDROUTES}
                        pageRoutes={config.PAGEROUTES}
                    />
                )
            default:
                return <div>Step numbers are out of whack somehow</div>
        };
    }


    const handleCheckbox = input => e => {
        setState({ ...data, [input]: e.target.checked })
    };
    return (
        <div className='sellersignup'>
            {switchToPage()}
        </div>
    )
}

export default SellerSignup;