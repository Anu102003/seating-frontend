import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { registerApi } from '../../actions/ApiCall'

export const Register = ({ setLogin }) => {
    const [registerValue, setregisterValue] = useState({
        email: "",
        companyName: "",
        password: ""
    })
    const [registerError, setregisterError] = useState({
        emailError: "",
        fullNameError: "",
        passwordError: "",
        validateError: ""
    })
    const [validregister, setValidregister] = useState({
        emailValid: false,
        fullName: false,
        passwordValid: false
    });
    const [registerLoading, setregisterLoading] = useState(false);
    const [registerEyeVisible, setregisterEyeVisible] = useState(false)


    //validating sign in value
    const mobileEmailChange = (e) => {
        const val = e.target.value;
        if (val === "") {
            setregisterError({ ...registerError, emailError: "Please enter a value" })
            setValidregister({ ...validregister, emailValid: false })
        }
        //email valid
        else if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val))) {
            setregisterValue({ ...registerValue, email: e.target.value })
            setregisterError({ ...registerError, emailError: "" })
            setValidregister({ ...validregister, emailValid: true })
        }
        else {
            setregisterError({ ...registerError, emailError: "Please enter a valid email" })
            setValidregister({ ...validregister, emailValid: false })
        }
    }


    //validating full name value
    const fullNameChange = (e) => {
        const fullname = e.target.value;
        if (fullname === "") {
            setregisterError({ ...registerError, fullNameError: "Please enter a value" })
            setValidregister({ ...validregister, fullNameValid: false })
        }
        //username valid
        else if (!(/^[A-Z][a-z]*( [A-Z][a-z]*)*$/.test(fullname))) {
            if (!/^[A-Z]/.test(fullname)) {
                setregisterError({ ...registerError, fullNameError: "Company name must start with a capital letter" })
                setValidregister({ ...validregister, fullNameValid: false })
            } else if (/\d/.test(fullname)) {
                setregisterError({ ...registerError, fullNameError: "Company name cannot contain numbers" })
                setValidregister({ ...validregister, fullNameValid: false })
            } else if (/[^a-zA-Z\s]/.test(fullname)) {
                setregisterError({ ...registerError, fullNameError: "Company name cannot contain special characters" })
                setValidregister({ ...validregister, fullNameValid: false })
            }
            else {
                setregisterValue({ ...registerValue, companyName: e.target.value })
                setregisterError({ ...registerError, fullNameError: "" })
                setValidregister({ ...validregister, fullNameValid: true })
            }
        }
        else {
            setregisterValue({ ...registerValue, companyName: e.target.value })
            setregisterError({ ...registerError, fullNameError: "" })
            setValidregister({ ...validregister, fullNameValid: true })
        }
    }



    //validating password 
    const registerPasswordChange = (e) => {

        const pwd = e.target.value;
        if (pwd === "") {
            setregisterError({ ...registerError, passwordError: "Please enter a password" })
            setValidregister({ ...validregister, passwordValid: false })
        } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?]).{8,15}$/.test(pwd) && pwd.length >= 8 && pwd.length <= 15) {
            setregisterValue({ ...registerValue, password: e.target.value })
            setregisterError({ ...registerError, passwordError: "" })
            setValidregister({ ...validregister, passwordValid: true })
        } else if (pwd.length > 15) {
            setregisterError({ ...registerError, passwordError: "Password must be 15 character" })
            setValidregister({ ...validregister, passwordValid: false })
        } else {
            setregisterError({ ...registerError, passwordError: "Password must contain at least one uppercase letter, one lowercase letter, one special character  and one digit" })
            setValidregister({ ...validregister, passwordValid: false })
        }
    }

    //sign up validate
    const validateregister = async (e) => {
        e.preventDefault();
        if (validregister.emailValid === true && validregister.fullNameValid === true
            && validregister.passwordValid === true) {
            setregisterError({ ...registerError, validateError: "" })
            const response = await registerApi(registerValue)
            try {
                if (response.message === "Register Successfully") {
                    console.log(response.message)
                    setLogin(true)
                }
                else if (response.response.status !== 200) {
                    setregisterError({ ...registerError, validateError: response.response.data.message })
                    console.log(response.response.data.message);
                }
            } catch (err) {
                console.log("Error in register")
            }
            setregisterLoading(true)
            setTimeout(() => {
                setregisterLoading(false);
            }, 2000);
        } else {
            setregisterError({ ...registerError, validateError: "Please enter correct data" })
            setregisterLoading(false)
        }
    }

    return (

        <>
            <div className='heading'>
                Register
            </div>
            {/* Input field of register value */}
            <input className='login-text'
                defaultValue={setregisterValue.email === "" ? "" : setregisterValue.email}
                onChange={mobileEmailChange}
                type='text'
                placeholder='Email address'
                autocomplete="off" />
            <p className='login-error'>{registerError.emailError}</p>

            {/* Input field of Full Name value */}
            <input className='login-text'
                defaultValue={setregisterValue.companyName === "" ? "" : setregisterValue.companyName}
                onChange={fullNameChange}
                type='text'
                placeholder='Company Name'
                autocomplete="off" />
            <p className='login-error'>{registerError.fullNameError}</p>


            {/* Input field of Password value */}
            <div className='sigin-password'>
                <div className='text-eye'>
                    <input className='login-text'
                        defaultValue={setregisterValue.password === "" ? "" : setregisterValue.password}
                        onChange={registerPasswordChange}
                        type={registerEyeVisible ? "text" : "password"}
                        placeholder='Password'
                        autocomplete="off" />
                    <div className='eye-icon' onClick={() => setregisterEyeVisible(!registerEyeVisible)}>
                        {
                            registerEyeVisible ?
                                <FontAwesomeIcon icon={faEye} /> :
                                <FontAwesomeIcon icon={faEyeSlash} />
                        }
                    </div>
                </div>
            </div>
            <p className='login-error'>{registerError.passwordError}</p>

            {/* Sign Up Button */}
            <button className='login-button' onClick={validateregister}>
                <div>
                    Sign Up
                </div>
            </button>
            {
                registerLoading ?
                    <div className='login-loading'>
                        {/* <img src={loginpage.loading} width="35px" /> */}
                    </div> :
                    <></>
            }
            <p className='login-error'>{registerError.validateError}</p>
        </>
    )
}