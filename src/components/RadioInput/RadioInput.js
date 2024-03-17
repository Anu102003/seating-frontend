import React, { useEffect } from 'react'

export const RadioInput = ({number,preference,handlePrefOnClick,label,handleSubmit}) => {
  const radioClick=()=>{
    handlePrefOnClick(number)
  }
  // const radioChange=()=>{
  //   handleSubmit()
  // }
  return (
    <label className="radio-btn">
              <input
                type="radio"
                name="option"
                checked={preference === number}
                onClick={radioClick}
                // onChange={radioChange}
              />
              {label}
            </label>
  )
}
