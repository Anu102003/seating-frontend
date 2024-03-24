import React, { useEffect, useState } from 'react'
import "./layoutPopup.scss"

export const LayoutPopup = ({ layoutOptions, optionSelected, setOptionSelected, count, setPopup, setSubmit }) => {

    // const [error, setError] = useState(false);
    useEffect(() => {
        function handleOption() {
            if (optionSelected === "") {
            } else {
                setSubmit(true);
                setPopup(false);
            }
        }

        if (optionSelected !== "") {
            handleOption();
        }
    }, [optionSelected, setSubmit, setPopup]);
    return (
        <div className='layout-popup'>
            {
                layoutOptions ?
                    <>
                        <p className='p-2'>Select any Options :</p>
                        <div className='options-btn'>
                            <button onClick={() => { setOptionSelected("Allocation") }}>Allocation</button>
                            <button onClick={() => { setOptionSelected("Seating") }}>Seating</button>
                        </div>
                    </>
                    :
                    <>
                        <p className='head'>Seating Count  : {count}</p>
                        <p className='p-1'>Click ok to contine</p>
                        <div className="home__buttons">
                            <button className="yes-btn" onClick={() => setSubmit(true)}>Ok</button>
                            <button className="no-btn" onClick={() => { setPopup(false) }}>Cancel</button>
                        </div>
                    </>
            }
        </div>
    )
}
