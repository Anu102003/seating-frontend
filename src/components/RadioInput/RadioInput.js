import React from 'react'

export const RadioInput = ({number,preference,handlePrefOnClick,label}) => {
  return (
    <label className="radio-btn">
              <input
                type="radio"
                name="option"
                checked={preference === number}
                onClick={() => handlePrefOnClick(number)}
              />
              {label}
            </label>
  )
}
