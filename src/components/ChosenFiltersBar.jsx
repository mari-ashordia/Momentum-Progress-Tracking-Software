import React from 'react'
import { useStore } from '../store/useStore'
import { handleFilter } from '../assets/utils/handleFilter';
import { departmentShortNames } from '../assets/utils/constants/departmentShortNames';
import { filterHelper } from '../assets/utils/filterHelper';
import { ActiveFilters } from './ActiveFilters';

export const ChosenFiltersBar = ({setFilteredTasks, filteredTasks}) => {
    const closeChosenFiltersBar = useStore(state => state.closeChosenFiltersBar);
    const clearFilters = useStore(state => state.clearFilters);
    const departments = useStore(state => state.departments);
    const priorities = useStore(state => state.priorities);
    const employees = useStore(state => state.employees);
    const {departments: filterDep, priority: filterPrio, employee: filterEmp} = useStore(state => state.filters);
    const tasks = useStore(state => state.tasks);

    const chosenDepObj = filterHelper(filterDep, departments, "departments");
    const chosenPriObj = filterHelper(filterPrio, priorities, "priority");
    const chosenEmpObj = filterHelper(filterEmp, employees, "employee");

    const filterDepShort = chosenDepObj?.map(({name, id, type}) => {
        const [filteredDeps] = departmentShortNames.filter(elem => name === elem.name);
        return {id, name: filteredDeps.shortName, type};
    })
    const selectedFilters = [...filterDepShort, ...chosenPriObj, ...chosenEmpObj];


  return (
    <div className = {`flex ${(filterDep.length > 0 || filterPrio.length > 0 || filterEmp.length > 0 || selectedFilters.length > 0) && "mt-[20px]"} `}>
        {(
            filterDep.length > 0 || 
            filterPrio.length > 0 || 
            filterEmp.length > 0
            ) && <ActiveFilters setFilteredTasks = {setFilteredTasks} filteredTasks={filteredTasks} filterArr = {selectedFilters}/>
        }
        {
          selectedFilters.length > 0 && (
            <button onClick = {() => {
                clearFilters();
                setFilteredTasks(tasks);
                closeChosenFiltersBar();
                // handleFilter(setFilteredTasks, tasks, filterDep, filterPrio, filterEmp)
            }} className = "cursor-pointer text-[14px] text-[#343A40] ml-2">გასუფთავება</button>
          )
        }
    </div>
  )
}
