import "./LayoutForm.scss";
import React, { useContext, useEffect, useRef, useState } from "react";
import { LayoutDesign } from "../LayoutDesign/LayoutDesign";
import { CompanyName } from "../../context/CreateContext";
import { useLocation, useNavigate } from "react-router-dom";
import { addLayout, addLayoutApi, createLayout, createLayoutApi } from "../../actions/ApiCall";
const LayoutForm = () => {
  const location = useLocation()
  const totalLayout = location?.state?.totalLayout
  const [formSubmit, setFormSubmit] = useState(false);
  const navigate = useNavigate()
  const { companyName } = useContext(CompanyName)
  const [details, setDetails] = useState({
    row: 0,
    column: 0
  })
  const [error, setError] = useState({
    row: false,
    column: false,
  })
  const [data, setData] = useState([])
  const [updateData, setUpdateData] = useState([])
  // console.log(data.length+1===parseInt(totalLayout))

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
      if (!(details.row > 0) && !(details.column > 0)) {
        setError((prevError) => ({ ...prevError, row: true, column: true }))
      } else if (!(details.row > 0)) {
        setError((prevError) => ({ ...prevError, row: true }))
      } else {
        setError((prevError) => ({ ...prevError, column: true }))
      }
    }
  }
  const handleErrorClose=()=>{
  if (details.row<1 && details.column<1) {
      setError((prevError) => ({ ...prevError, formSubmit: false }))
    }
  }
  useEffect(() => {
    async function fetchAndNavigate() {
      if (totalLayout !== false) {
        console.log(data.length, totalLayout, data.length >= parseInt(totalLayout))
        if (data.length >= totalLayout) {
          const res = await createLayoutApi(companyName, data);
          navigate("/");
        }
        
      } else {
        if (updateData.length>0 && details.row>0 && details.column>0) {
          const res = await addLayoutApi(companyName, updateData);
          if(res.message==="updates done"){
            navigate("/operations")          
          }
        }
      }
    }
    fetchAndNavigate();
  }, [data.length, totalLayout,updateData.length]);

  return (
    <>

      <div className="register-form-wrapper">
        <div className="form-container">
          <div className="form">
            {
              totalLayout !== false ? <>
                <h2 className="form__head">Total Layout : {totalLayout}</h2>

                <h3 className="form__heading">Layout {data.length + 1}</h3>
              </> :
                <h3 className="form__heading">Layout </h3>

            }

            {/* row */}
            <div className="form__input">
              <p className="label">Enter Rows</p>
              <div className={`input-container ${(details.row > 0) && "activeInput"}`}>
                <input
                  name="row"
                  type="number"
                  value={details.row}
                  min="1"
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
                  min="1"
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
                  {formSubmit ? "Scroll Down" : "Next"}
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
      {formSubmit &&
        <LayoutDesign row={details.row} column={details.column} setData={setData} setUpdateData={setUpdateData} setFormSubmit={setFormSubmit} setDetails={setDetails} data={data} totalLayout={totalLayout} />
      }
     
    </>
  );
};
export default LayoutForm;
