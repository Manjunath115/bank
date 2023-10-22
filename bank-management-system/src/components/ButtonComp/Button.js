import React from "react";
import st from './style.module.css';

const Button=({text,clickOnButton,className})=>{

    return (
        <button text={text} className={`${st.primary_btn} ${className}  `} onClick={clickOnButton}>{text}</button>
    )
}
export default Button;