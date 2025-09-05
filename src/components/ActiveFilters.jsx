import React, { useEffect } from 'react'
import { useStore } from '../store/useStore'
import { handleFilter } from '../assets/utils/handleFilter';

export const ActiveFilters = ({filterArr, filteredTasks, setFilteredTasks}) => {
  const removeFilter = useStore(state => state.removeFilter);
  const filters = useStore(state => state.filters);
  const tasks = useStore(state => state.tasks);
  
  const filterFunc = (id, name, type) => {
    const newFiltered = filteredTasks.filter((elem) => {
      if(type === "departments") type = "department";
       return (id && name && type) && (id !== elem[type].id);
    })
    if(newFiltered.length === 0) setFilteredTasks(tasks);
    else if(id && name && type) setFilteredTasks(newFiltered);

  }

  return (
    <div className = "flex">
      {
        filterArr.map(({id, name, type}) => {
          // console.log("new: ", id, name, type);
          return (
          <div key = {name} className = "flex justify-center items-center mr-[10px] border-[1px] border-[#CED4DA] py-[6px] px-[10px] rounded-[43px]">
              <p className = "text-[14px] text-[#343A40]">{name}</p>
              <button onClick = {() => {
                removeFilter(type, id, name);
                filterFunc(id, name, type)
                }} className = "cursor-pointer text-[20px] ml-[4px] p-[1px]">&times;</button>
          </div>
        )
        })
      }
    </div>
  )
}
