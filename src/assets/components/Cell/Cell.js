import React, { useState } from "react";

export const Cell = ({ updateValue, rowIndex, colIndex, cellValue, update }) => {

  const [isActive, setIsActive] = useState(false);
  const handleUpdate = () => {
    if (update) {
      updateValue(rowIndex, colIndex, cellValue === 1 ? 0 : 1);
    } else if (update === undefined) {
      // console.log(isActive)
      updateValue(rowIndex, colIndex, isActive ? 0 : 1);
      setIsActive(!isActive);
    }
  };
  return (
    <div
      className={isActive ? "active column" : "column"}
      key={colIndex}
      onClick={handleUpdate}
    >{cellValue}</div>
  );
};
