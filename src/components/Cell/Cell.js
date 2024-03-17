import React, { useState } from "react";

export const Cell = ({ updateValue, rowIndex, colIndex }) => {

  const [isActive, setIsActive] = useState(false);
  const handleUpdate = () => {
    updateValue(rowIndex, colIndex, isActive ? 0 : 1);
    setIsActive(!isActive);
  };
  
  return (
    <div
      className={isActive ? "active column" : "column"}
      key={colIndex}
      onClick={handleUpdate}
    ></div>
  );
};
