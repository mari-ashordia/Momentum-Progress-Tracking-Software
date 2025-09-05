import React from 'react'

export const CustomSelect = ({name, value, setValue, styles, children}) => {
  return (
    <select name = {name} value = {value} setValue = {setValue} styles = {styles}>
        {children}
    </select>
  )
}
