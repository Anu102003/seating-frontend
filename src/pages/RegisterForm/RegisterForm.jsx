import "./RegisterForm.scss";
import React, { useContext, useEffect, useState } from "react";
import { LayoutDesign } from "../LayoutDesign/LayoutDesign";
import { CompanyName } from "../../context/CreateContext";
import { useNavigate } from "react-router-dom";
const RegisterForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
const navigate=useNavigate()
const {companyName} =useContext(CompanyName)
  const [details, setDetails] = useState({
    row: 0,
    column: 0
  })
  const [error, setError] = useState({
    row: false,
    column: false
  })

  const handleInput = (e) => {
    const { name, value } = e.target
    setDetails((prevDetails) => ({ ...prevDetails, [name]: parseInt(value) }));
    if (value > 0) {
      setError((prevError) => ({ ...prevError, [name]: false }))
    } else {
      setError((prevError) => ({ ...prevError, [name]: true }))
    }
  }
  const handleSubmit = () => {
    if (details.row > 0 && details.column > 0) {
      setFormSubmit(true)
    } else {
      setFormSubmit(false)
      if (!(details.row > 0)&&!(details.column > 0)) {
        setError((prevError) => ({ ...prevError, row: true, column: true }))
      } else if (!(details.row > 0)) {
        setError((prevError) => ({ ...prevError, row: true }))
      } else {
        setError((prevError) => ({ ...prevError, column: true }))
      }
    }
  }
  useEffect(() => {
    if (CompanyName === "") {
      navigate("/")
    }
  }, [companyName])

  return (
    <>
      {!formSubmit ? (
        <div className="register-form-wrapper">
          <div className="form-container">

            <div className="form">
              <h2 className="form__heading">Registration</h2>


              {/* row */}
              <div className="form__input">
                <p className="label">Enter Rows</p>
                <div className={`input-container ${(details.row > 0) && "activeInput"}`}>
                  <input
                    name="row"
                    type="number"
                    value={details.row}
                    min="0"
                    onChange={handleInput}
                    placeholder="Enter number of Rows"
                  />

                </div>
              </div>
              {
                error.row &&
                <p className="error">Row should be greater than one</p>
              }


              {/* column */}
              <div className="form__input">
                <p className="label">Enter Columns</p>
                <div className={`input-container ${(details.column > 0) && "activeInput"}`}>
                  <input
                    name="column"
                    type="number"
                    value={details.column}
                    min="0"
                    onChange={handleInput}
                    placeholder="Enter number of columns"
                  /></div>
              </div>
              {
                error.column &&
                <p className="error">Column should be greater than one</p>
              }


              {/* submit button */}
              <div className="submit-btn-container">
                <div className="submit-btn">
                  <button onClick={handleSubmit}>
                    Submit
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      ) : (
        <LayoutDesign row={details.row} column={details.column} />
      )}
    </>
  );
};
export default RegisterForm;
