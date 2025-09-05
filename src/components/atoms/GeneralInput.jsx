import React from 'react'

export const GeneralInput = ({type, value, setValue,labelContent, handleChange, name, label, styles: {divStyle, labelStyle, inputStyle}}) => {
  return (
    <div className = {divStyle}>
        <label for = {label} className = {labelStyle}>{labelContent}</label>
        <input type = {type} id = {label} name = {name} value = {value} onChange={handleChange} className = {inputStyle}/>
    </div>
  )
}
