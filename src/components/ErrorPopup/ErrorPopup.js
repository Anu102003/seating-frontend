import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "./errorPopup.scss"

export const ErrorPopup = () => {
    return (
        <div className='error-wrapper'>
            <FontAwesomeIcon icon={faCircleExclamation} color='#cc3131' size='5x' style={{marginTop:"4rem"}} />
            <p className='error-txt'>Given space is more than Available Space</p>
        </div>
    )
}
