import React from 'react';
import "./style.css";


function Button({text,onClick={},disabled,style}) {
  return (
    <div onClick={onClick} disabled={disabled} style={style} className='custom-btn'>{text}</div>
  )
}

export default Button