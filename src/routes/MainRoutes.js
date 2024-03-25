import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Seating from "../pages/Seating/Seating";
import { CompanyName } from "../context/CreateContext";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import LayoutForm from "../pages/LayoutForm/LayoutForm";
import LayoutRegister from "../pages/LayoutRegister/LayoutRegister";
import { Home } from "../pages/Home/Home";
import { Operations } from "../pages/Operations/Operations";
import NavBar from "../pages/NavBar";
import { Allocation } from "../pages/Allocation/Allocation";
import { SingleAllocation } from "../pages/SingleAllocation/SingleAllocation";

const MainRoutes = () => {
  const [companyName, setCompanyName] = useState("iceq")
  const[companyNotFound,setCompanyNotFound]=useState(false)

  return (
    <BrowserRouter>
      <NavBar companyNotFound={companyNotFound}/>
      <CompanyName.Provider value={{ companyName, setCompanyName }}>
        <Routes>
          <Route path="/seating" element={<Seating />} />
          <Route path="/register" element={<LayoutRegister />} />
          <Route path="/layoutform" element={<LayoutForm />} />
          <Route path="/allocation" element={<Allocation />} />
          <Route path="/allocationitem" element={<SingleAllocation />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/register" element={<RegisterForm/>}/> */}
          <Route path="/operations" element={<Operations />} />
          <Route path="/" element={<Home companyNotFound={companyNotFound} setCompanyNotFound={setCompanyNotFound} />} />
        </Routes>
      </CompanyName.Provider>
    </BrowserRouter>
  );
};

export default MainRoutes;
