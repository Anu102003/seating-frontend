import React, { useContext, useEffect, useState } from "react";
import "./LayoutDesign.scss";
import axios from "axios";
import { Cell } from "../../components/Cell/Cell";
import { CompanyName } from "../../context/CreateContext";
import { useNavigate } from "react-router-dom";
import { postlayoutApi } from "../../actions/ApiCall";
import { LayoutPopup } from "../../components/LayoutPopup/LayoutPopup";

export const LayoutDesign = ({ row, column }) => {

  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [popup, setPopup] = useState(false)
  const [newData, setNewData] = useState(null);
  const [arrayData, setArrayData] = useState({});
  const { companyName } = useContext(CompanyName);
  const dataArray = Object.values(arrayData);
  const [submit, setSubmit] = useState(false);


  const updateValue = (rowIndex, colIndex, value) => {
    const newArrayData = { ...arrayData };
    newArrayData[rowIndex][colIndex] = value;
    setArrayData(newArrayData);
  };

  useEffect(() => {
    const initialArrayData = {};
    for (let i = 0; i < row; i++) {
      initialArrayData[i] = Array(column).fill(0);
    }
    setArrayData(initialArrayData);
  }, [row, column]);


  const layOutDto = {
    companyName: companyName,
    row: row,
    column: column,
    layOut: dataArray,
  };

  const handleSubmit = () => {
    setPopup(true)
    const ans = getCount();
    setCount(ans);
  };

  useEffect(() => {
    async function fetchData() {
      if (submit) {
        const result = handleResult(layOutDto);
        const res = await postlayoutApi(result);
        // console.log(res);
        navigate("/seating", { state: { data: result, flag: true, availableSpaces: count } });
      }
    }
    fetchData();
  }, [submit])


  const getCount = () => {
    let total = 0;
    dataArray.map((value, i) => {
      let v = JSON.stringify(value);
      let x = v.length - v.replaceAll("1", "").length
      total += x
      setNewData(total);
    })
    return total;
  }

  function handleResult(data) {
    return data;
  }

  useEffect(() => {
    function handle(e) {
      if (e.target.className === "product-popup-parent") {
        setPopup(false)
      }
    }
    window.addEventListener("click", handle)
    return () => window.removeEventListener("click", handle)
  }, [])

  return (
    <div className="layout-page">
      {dataArray.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((_, colIndex) => (
            <Cell
              key={colIndex}
              updateValue={updateValue}
              rowIndex={rowIndex}
              colIndex={colIndex}
            />
          ))}
        </div>
      ))}
      <div className="submit-btn-container">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {
        popup &&
        <div className='product-popup-parent'>
          <div className='product-popup'>
            <LayoutPopup count={count} setPopup={setPopup} setSubmit={setSubmit} />
          </div>
        </div>
      }
    </div>
  );
};
