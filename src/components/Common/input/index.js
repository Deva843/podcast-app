// import { type } from '@testing-library/user-event/dist/type'
import React from 'react'
import "./style.css"

function InputComponent({state,setState,type,required,placeholder}) {
  return (
    <input 
    type={type}  
    placeholder={placeholder}
    value ={state} 
    onChange={e=>setState(e.target.value)} 
    required={required}
    className='custom-input'
    />
  );
}

export default InputComponent