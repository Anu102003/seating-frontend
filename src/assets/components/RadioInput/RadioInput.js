import React, { useEffect } from 'react'
import "./RadioInput.scss"

export const RadioInput = ({number,preference,handlePrefOnClick,label,handleSubmit}) => {
  // const radioClick=()=>{
  //   setPreference(number)
  // }
  // const radioChange=()=>{
  //   handleSubmit()
  // }
  return (
    <label className="radio-btn">
              <input
                type="radio"
                name="option"
                checked={preference === number}
                onClick={()=>{handlePrefOnClick(number)}}
                // onChange={radioChange}
              />
              {label}
            </label>
  )
}
