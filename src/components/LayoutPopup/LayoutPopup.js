import React from 'react'
import "./layoutPopup.scss"
export const LayoutPopup = ({ count ,setPopup,setSubmit}) => {

    return (
        <div className='layout-popup'>
           <p className='head'>Seating Count  : {count}</p> 
           <p className='p-1'>Click ok to contine</p>
            <div className="home__buttons">
              <button className="yes-btn"onClick={()=>{setSubmit(true)}}>Ok</button>
              <button className="no-btn"onClick={()=>{setPopup(false)}}>Cancel</button>
            </div>
        </div>
    )
}
