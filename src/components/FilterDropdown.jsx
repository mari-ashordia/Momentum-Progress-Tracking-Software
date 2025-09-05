import React, { useEffect, useState } from 'react'
import { useStore } from '../store/useStore';
import { handleFilter } from '../assets/utils/handleFilter';

export const FilterDropdown = ({setFilteredTasks}) => {
    const {
            departments, 
            priorities, 
            employees,
            fetchDepartments,
            fetchPriorities,
            fetchEmployees,
            isPriorityOpen,
            isDepartmentOpen,
            isEmployeeOpen,
            setFilters,
            filters: {departments: filterDep, priority: filterPriority, employee: filterEmployee},
            tasks, 
            closeDepartment,
            closePriority,
            closeEmployee,
            openChosenFiltersBar
         } = useStore();

    useEffect(() => {
        fetchDepartments();
        fetchEmployees();
        fetchPriorities();
    }, [fetchDepartments, fetchEmployees, fetchPriorities]);

    const checkFunc = (filterType, option) => {
        if(filterType.includes(option)) return true;
        else return false;
    }

  return (
    <div className = "relative">
    <div className = "absolute z-10 bg-white flex flex-col border-[0.5px] border-[#8338EC] rounded-[10px] pt-[40px] pb-[20px] px-[30px] w-[688px] h-[274px] overflow-y-scroll overflow-x-hidden mt-2.5">
        <div>
            {
                isDepartmentOpen && (departments.map(({id, name}, i, arr) => (
                    <div key = {id} className = {`flex items-center gap-3 ${i !== arr.length - 1 && "pb-[22px]"}`}>
                        <input type = "checkbox" 
                            className = "transform scale-150 accent-white" 
                            onChange={() => {
                                setFilters("departments", id);
                            }}
                            checked = {checkFunc(filterDep, id)}
                        />
                        <p className = "16px text-[#212529]">{name}</p>
                    </div>
                )))
            }
            {
                isPriorityOpen && (priorities.map(({id, name, icon}, i, arr) => (
                    <div key = {id} className = {`flex items-center gap-3 ${i !== arr.length - 1 && "pb-[22px]"}`}>
                        <input type = "checkbox" 
                            className = "transform scale-150 accent-white"
                            onChange={() => {
                                setFilters("priority", id);
                            }}
                            checked = {checkFunc(filterPriority, id)}
                        />
                        <p className = "16px text-[#212529]">{name}</p>
                    </div>
                )))
            }
            {
                isEmployeeOpen && (employees.map(({id, name, surname, avatar}, i, arr) => (
                    <div key = {id} className = {`flex items-center gap-3 ${i !== arr.length - 1 && "pb-[22px]"}`}>
                        <input type = "checkbox" 
                            className = "transform scale-150 accent-white"
                            onChange={() => {
                                setFilters("employee", id);
                            }}
                            checked = {checkFunc(filterEmployee, id)}
                        />
                        <div className = "w-[31px] h-[31px] border-transparent rounded-2xl overflow-hidden">
                            <img src = {avatar} alt = "avatar"/>
                        </div>
                        <p className = "16px text-[#212529]">{name + " " + surname}</p>
                    </div>
                )))
            }
        </div>
        <button className = "sticky bottom-0 left-9/12 cursor-pointer text-[16px] text-white w-[155px] border border-[#8338EC] bg-[#8338EC] rounded-[20px] py-[8px] px-[20px]"
                onClick = {() => {
                    handleFilter(setFilteredTasks, tasks, filterDep, filterPriority, filterEmployee);
                    openChosenFiltersBar();
                    closeDepartment();
                    closePriority();
                    closeEmployee();
                }}>
            არჩევა
        </button>
        
    </div>
    </div>
  )
}
