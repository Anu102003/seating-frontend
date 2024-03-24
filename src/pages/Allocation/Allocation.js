import React, { useEffect, useState } from 'react'
import "./allocation.scss"
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllAllocationApi } from '../../actions/ApiCall';

export const Allocation = () => {
    const location = useLocation();
    const navigate=useNavigate();
    const data = location.state.data;
    const layoutId = location.state.layoutId;
    const availableSpaces = location.state.availableSpaces;

    const [allocationList, setAllocationList] = useState()
    useEffect(() => {
        async function getAllAllocation() {
            try {
                const res = await getAllAllocationApi(layoutId)
                setAllocationList(res.data)
                //   console.log(res.message)
            } catch (err) {
                console.log(err)
            }
        }
        getAllAllocation()
    }, [layoutId])
    const handleNavigate = () => {
        navigate("/seating", {
            state: {
                data: data,
                layoutId: layoutId,
                availableSpaces: availableSpaces
            }
        });
    }
    console.log(allocationList)
    return (
        <div className='allocation-page'>
            {
                allocationList?.length > 0 ?
                    <>
                        {
                            allocationList?.map((e, index) => (
                                <p>Allocation {index + 1}</p>
                            ))
                        }
                    </> :
                    <>
                        <h3 className='heading'>No Allocations has been done yet</h3>
                        <div className='navigate-btn-wrapper'>
                            <button className='navigate-btn' onClick={handleNavigate}>Click here to see allocation</button>
                        </div>
                    </>
            }
        </div>
    )
}
