import React, { useState } from 'react'

export const useInput = (initialValue) => {
    const [state, setState] = useState(initialValue);
    const handleChange = (e) => {
      const {name, value} = e.target;
      setState(prev => ({...prev, [name]: value}));
    }

  return {
    state,
    setState,
    handleChange
  }
}
