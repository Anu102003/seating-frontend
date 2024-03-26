import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { loginApi } from '../../actions/ApiCall'
import { CompanyName } from '../../context/CreateContext'
import { useNavigate } from 'react-router-dom'

export const Login = ({setAuthenticate}) => {

    // const { setCompanyName } = useContext(CompanyName)
    const navigate = useNavigate();
    const [loginValue, setloginValue] = useState({
        emailid: "",
        password: ""
    })

    const [loginError, setloginError] = useState({
        loginError: "",
        passwordError: "",
        validateError: ""
    })

    const [validlogin, setValidlogin] = useState({
        loginValid: false,
        passwordValid: false
    });

    const [eyeVisible, setEyeVisible] = useState(false)

    const [loginLoading, setloginLoading] = useState(false);

    //validating sign in value
    const loginChange = (e) => {

        const { value } = e.target;

        if (value === "") {
            setloginError({ ...loginError, loginError: "Please enter a value" })
            setValidlogin({ ...validlogin, loginValid: false })
        }

        //email valid
        else if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
            setloginValue({ ...loginValue, emailid: e.target.value })
            setloginError({ ...loginError, loginError: "" })
            setValidlogin({ ...validlogin, loginValid: true })
        }

        else {
            setloginError({ ...loginError, loginError: "Incorrect email" })
            setValidlogin({ ...validlogin, loginValid: false })
        }
    }


    //validating password 
    const passwordChange = (e) => {

        const pwd = e.target.value;
        if (pwd === "") {
            setloginError({ ...loginError, passwordError: "Please enter a password" })
            setValidlogin({ ...validlogin, passwordValid: false })
        } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?]).{8,15}$/.test(pwd) && pwd.length >= 8 && pwd.length <= 15) {
            setloginValue({ ...loginValue, password: e.target.value })
            setloginError({ ...loginError, passwordError: "" })
            setValidlogin({ ...validlogin, passwordValid: true })
        } else if (pwd.length > 15) {
            setloginError({ ...loginError, passwordError: "Password must be 15 character" })
            setValidlogin({ ...validlogin, passwordValid: false })
        } else {
            setloginError({ ...loginError, passwordError: "Password must contain at least one uppercase letter, one lowercase letter, one special character and one digit" })
            setValidlogin({ ...validlogin, passwordValid: false })
        }
    }

    //sign in validate
    const validatelogin = async (e) => {
        e.preventDefault();
        if (validlogin.loginValid === true && validlogin.passwordValid === true) {
            setloginError({ ...loginError, validateError: "" })
            const response = await loginApi(loginValue)
            try {
                if (response.message ==='Login successful') {
                    // setCompanyName(response.data.companyName)
                    localStorage.setItem('companyName', response.data.companyName);
                    setAuthenticate(true)
                    navigate("/home")
                }
                else if (response.response.status !== 200) {
                    setloginError({ ...loginError, validateError: response.response.data.message })
                    console.log(response.response.data.message);
                }
            } catch (err) {
                console.log("Error in login")
            }
            setloginLoading(true)
            setTimeout(() => {
                setloginLoading(false);
            }, 2000);
        } else {
            setloginError({ ...loginError, validateError: "Please enter correct data" })
            setloginLoading(false)
        }
    }

    return (
        <>
            <div className='heading'>
                Login
            </div>
            {/* Input field of login value */}
            <input className='login-text'
                defaultValue={setloginValue.emailid === "" ? "" : setloginValue.emailid}
                onChange={loginChange}
                type='text'
                placeholder='Email address'
                autocomplete="false" />
            <p className='login-error'>{loginError.loginError}</p>


            {/* Input field of Password value */}
            <div className='sigin-password'>
                <div className='text-eye'>
                    <input className='login-text'
                        defaultValue={setloginValue.password === "" ? "" : setloginValue.password}
                        onChange={passwordChange}
                        type={eyeVisible ? "text" : "password"}
                        placeholder='Password'
                        autocomplete="false" />
                    <div className='eye-icon' onClick={() => setEyeVisible(!eyeVisible)}>
                        {
                            eyeVisible ?
                                <FontAwesomeIcon icon={faEye} /> :
                                <FontAwesomeIcon icon={faEyeSlash} />
                        }
                    </div>
                </div>
            </div>
            <p className='login-error'>{loginError.passwordError}</p>


            {/* Sign In Button */}
            <button className='login-button' onClick={validatelogin}>
                <div>
                    Sign In
                </div>
            </button>
            {
                loginLoading ?
                    <div className='login-loading'>
                        {/* <img src={loginpage.loading} width="35px" /> */}
                    </div> :
                    <></>
            }
            <p className='login-error'>{loginError.validateError}</p>
        </>
    )
}