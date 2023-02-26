import React from 'react'
import Popup from 'reactjs-popup'

import { AiFillCloseCircle } from "react-icons/ai";


const FormPopup = (props) => {
  const { popUpContent, title } = props

  return (
    <Popup
    trigger={<button className="button button__shadow button__shadow--blue"> Add Task </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close close-icon" onClick={close}>
          <AiFillCloseCircle />
        </button>
        <div className="header">{title}</div>
        <div className="content">
          {popUpContent}
        </div>
        <div className="actions">
          {/* <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            close modal
          </button> */}
        </div>
      </div>
    )}
  </Popup>
  )
}

export default FormPopup