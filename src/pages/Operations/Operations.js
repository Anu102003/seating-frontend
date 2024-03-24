import React, { useContext, useEffect, useState } from 'react'
import "./Operations.scss"
import { useNavigate } from 'react-router-dom'
import { getAlllayoutApi } from '../../actions/ApiCall'
import { CompanyName } from '../../context/CreateContext'
import { UpdatePopup } from '../../assets/components/UpdatePopup/UpdatePopup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

export const Operations = () => {
    const companyName = useContext(CompanyName)
    const navigate = useNavigate()
    const [allLayouts, setLayouts] = useState()
    const [popup, setPopup] = useState(false)
    const [layoutSeleted, setLayoutSeleted] = useState()
    const handleLayoutSelected = (layout) => {
        setLayoutSeleted(layout)
    }
    useEffect(() => {
        handleLayoutSelected();
    }, []);
    const handleAdd = () => {
        navigate("/layoutform", { state: { totalLayout: false, } })
    }
    useEffect(() => {
        function handle(e) {
            if (e.target.className === "update-popup-parent") {
                setPopup(false)
                document.body.style.overflow = "unset"
            }
        }
        window.addEventListener("click", handle)
        return () => window.removeEventListener("click", handle)
    }, [])
    useEffect(() => {
        async function getAllLayouts() {
            try {
                const res = await getAlllayoutApi(companyName.companyName)
                setLayouts(res.data)
                if (res.message === "Company not found") {
                } else {
                }
            } catch (err) {
                console.log(err)
            }
        }
        getAllLayouts()
    }, [companyName])

    useEffect(() => {
        console.log(layoutSeleted?.layoutId)
    }, [layoutSeleted])

    const handleDelete = async () => {
        try {
            console.log("first", layoutSeleted?.layoutId)
            // const res = await deleteLayoutApi(
            //     layoutSeleted.layoutId,
            //     companyName.companyName,
            //     )
            //     if(res.message==="updates done"){
            //         navigate("/operations")
            //     }
            //     console.log(res)
        } catch (err) {
            console.log("Error in deleting", err)
        }
    }
    return (
        <div className='operations-page'>
            <div className='add-btn-wrapper'>
                <button className='add-btn' onClick={handleAdd}>
                    +  Add
                </button>
            </div>
            <div className='operation-layout-page'>
                <table className="MyTable">
                    <tbody>
                        {allLayouts?.companyLayout?.map((layout, index) => (
                            <div className='operation-layout-list' onClick={() => handleLayoutSelected(layout)}>
                                <div className='grid-wrapper' onClick={() => { setPopup(true); document.body.style.overflow = "hidden" }}>
                                    <p className='heading'>Layout {index + 1}</p>
                                    <div >
                                        {layout?.companyLayout?.map((row, i) => {
                                            return (
                                                <tr key={i} >
                                                    {row?.map((value, j) => {
                                                        return (
                                                            <>
                                                                <td
                                                                    key={j}
                                                                    className="grid-box"
                                                                    style={{
                                                                        backgroundColor:
                                                                            value === 1 ? "#3FA9F5" : "#eeecf0",
                                                                        color:
                                                                            value === 1 ? "#3FA9F5" : "#eeecf0",
                                                                    }}>
                                                                    {value}
                                                                </td>
                                                            </>
                                                        );
                                                    })}
                                                </tr>
                                            );
                                        })
                                        }
                                    </div>
                                </div>
                                <div className='btn-wrapper'>
                                    <button className='update-btn' onClick={() => { setPopup(true); document.body.style.overflow = "hidden" }}>Update</button>
                                    <button className='delete-btn' onClick={handleDelete}>Delete</button>
                                </div>
                            </div>
                        ))}

                    </tbody>
                </table>
                {
                    popup &&
                    <div className='update-popup-parent'>
                        <div className='update-popup'>
                            <div className='close-icon' onClick={() => { setPopup(false); document.body.style.overflow = "unset" }}>
                                <FontAwesomeIcon icon={faClose} size='2xl' />
                            </div>
                            <UpdatePopup layoutSeleted={layoutSeleted} setPopup={setPopup} />
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}
