import React, { useContext, useEffect, useState } from 'react'
import "./updatePopup.scss"
import { Cell } from '../Cell/Cell'
import { updateLayoutApi } from '../../../actions/ApiCall'
import { CompanyName } from '../../../context/CreateContext'
import { useNavigate } from 'react-router-dom'

export const UpdatePopup = ({ layoutSeleted,setPopup }) => {
    const companyName = useContext(CompanyName);
    const navigate = useNavigate()
    const [layoutData, setLayoutData] = useState(layoutSeleted.companyLayout);

    const updateCellValue = (rowIndex, colIndex, newValue) => {
        const updatedLayout = [...layoutData];
        updatedLayout[rowIndex][colIndex] = newValue;
        setLayoutData(updatedLayout);
    };
    console.log(layoutSeleted.layoutId, layoutData, companyName.companyName
    )

    const handleSubmit = async () => {
        try {
            const res = await updateLayoutApi(
                layoutSeleted.layoutId,
                companyName.companyName,
                layoutData
                )
                if(res.message==="updates done"){
                    navigate("/operations")
                    setPopup(false)
                    document.body.style.overflow = "unset"
                }
        } catch (err) {
            console.log("Error in updating", err)
        }
    }

    return (
        <div>
            <p className='heading'>Update Layout</p>
            <div>
            {layoutData?.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row?.map((cell, colIndex) => (
                        <Cell
                            update={true}
                            key={colIndex}
                            cellValue={cell}
                            updateValue={updateCellValue}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                        />
                    ))}
                </div>
            ))}     
            </div>
           
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}
