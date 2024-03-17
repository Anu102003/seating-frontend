import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Seating from "../pages/Seating/Seating";
import Home from "../pages/Home/Home";
import RegisterForm from "../pages/RegisterForm/RegisterForm";
import {CompanyName} from "../context/CreateContext";

const MainRoutes = () => {
  const[companyName,setCompanyName]=useState("")
  return (
    <BrowserRouter>
    <CompanyName.Provider value={{companyName,setCompanyName}}>
      <Routes>
        <Route path="/seating" element={<Seating />} />
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<RegisterForm/>}/>
      </Routes>
      </CompanyName.Provider>
    </BrowserRouter>
  );
};

export default MainRoutes;
