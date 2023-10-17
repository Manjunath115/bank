
import React from 'react';
import st from './style.module.css'

const Input = ({type,onTextChange,placeholder}) => {
  return (
    <input type={type || "text"} className={st.input} placeholder={placeholder} onChange={onTextChange} />
  )
}

export default Input