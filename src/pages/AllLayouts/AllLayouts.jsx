import React, { useContext, useEffect, useState } from 'react'
import "./AllLayout.scss"
import { LayoutPopup } from '../../assets/components/LayoutPopup/LayoutPopup'
import { useNavigate } from 'react-router-dom'

export const AllLayouts = ({ allLayouts }) => {

  const [popup, setPopup] = useState(false)
  useEffect(() => {
    function handle(e) {
      if (e.target.className === "allocation-seating-popup-parent") {
        setPopup(false)
        setLayoutSeleted()
        setOptionSelected("")
        setSubmit(false)
      }
    }
    window.addEventListener("click", handle)
    return () => window.removeEventListener("click", handle)
  }, [])
  const [optionSelected, setOptionSelected] = useState("")
  const [submit, setSubmit] = useState(false)
  const navigate = useNavigate()
  const [layoutSelected, setLayoutSeleted] = useState()
  const handleLayoutSelected = (layout) => {
    setPopup(true)
    setOptionSelected("")
    setSubmit(false)
    setLayoutSeleted(layout)
  }
  useEffect(() => {
    if (submit && optionSelected !== "") {
      if (optionSelected === "Seating") {
        navigate("/seating", {
          state: {
            data: layoutSelected.companyLayout,
            layoutId: layoutSelected.layoutId,
            availableSpaces: layoutSelected.totalSpace
          }
        });
      }
      if (optionSelected === "Allocation") {
        navigate("/allocation", {
          state: {
            data: layoutSelected.companyLayout,
            layoutId: layoutSelected.layoutId,
            availableSpaces: layoutSelected.totalSpace
          }
        });
      }
    }
  })
  console.log(allLayouts)
  return (
    <div className='all-layout-page'>
      <table className="MyTable">
        <tbody>
          {allLayouts?.companyLayout?.map((layout, index) => (
            <div className='layout-list' onClick={() => { handleLayoutSelected(layout) }}>
              <div>
                <p className='heading'>Layout {index + 1}</p>
                <h3 style={{ color: layout.changed && "#FF6767" }}>{!layout.changed ? "( New Layout )" : "( Old Layout )"}</h3>
              </div>
              <div className='grid-wrapper'>
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
                                  value === 1 ? "#F4BD36" : "#eeecf0",
                                color:
                                  value === 1 ? "#F4BD36" : "#eeecf0",
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
          ))}

        </tbody>
      </table>
      {
        popup &&
        <div className='allocation-seating-popup-parent'>
          <div className='allocation-seating-popup'>
            <LayoutPopup layoutOptions={true} setPopup={setPopup} optionSelected={optionSelected} setOptionSelected={setOptionSelected} setSubmit={setSubmit} />
          </div>
        </div>
      }
    </div>
  )
}
