import { useContext, useEffect, useState } from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { CompanyName } from "../../context/CreateContext";
import { layoutApi } from "../../actions/ApiCall";

const Home = () => {
  const { companyName, setCompanyName } = useContext(CompanyName);
  const navigate = useNavigate();
  const [error, setError] = useState(false)
  useEffect(() => {
    loadScreen();
  });
  const loadScreen = async () => { };

  const handleYes = async () => {
    if(companyName===""){
      setError(true)
    }else{
      setError(false)
      const name = companyName;
      try {
        const res = await layoutApi(name);
        const result = handleResult(res.data);
        // console.log(result.layOut)
        navigate("/seating", { state: { data: result.layOut, flag: false, availableSpaces: result.availableSpaces } });
      } catch (error) {
        console.error("Error fetching layout:", error);
      }
    }
    
    
  }
  function handleResult(data) {
    return data;
  }
  const handleNo = async () => {
    if(companyName===""){
      setError(true)
    }else{
      setError(false)
    navigate("/register");
    }
  };

  return (
    <>
      <div className="home-page">
        <div className="home-page__left">
          <img src="https://octopod.co.in/slink/images/login.svg" />
        </div>
        <div className="home-page__right">
          <div className="home">
            <h4 className="home__heading">Welcome </h4>
            <p className="home__head">
              <p>Company Name</p>
              <p className="danger">*</p>
            </p>
            <div className={`home__input ${companyName !== "" && "activeInput"}`}>
              <input
              placeholder="Enter company name"
              autoSave="false"
                type="text"
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
              />
            </div>
            {
              error &&
              <p className="error">Please Enter Company Name</p>
            }
            <p className="p-1"> Is company name already registered ?</p>

            <div className="home__buttons">
              <button className="yes-btn"onClick={handleYes}>Yes</button>
              <button className="no-btn"onClick={handleNo}>No</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
