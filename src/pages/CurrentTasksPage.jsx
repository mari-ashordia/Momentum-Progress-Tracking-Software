// import { ChosenFiltersBar } from '../components/chosenFiltersBar';
import { useEffect, useState } from 'react';
import FilterBar from '../components/FilterBar'
import { FilterDropdown } from '../components/FilterDropdown';
import { TasksGrid } from '../components/TasksGrid';
import { useStore } from '../store/useStore';
import { ChosenFiltersBar } from '../components/chosenFiltersBar';
import { Modal } from '../components/Modal';

const CurrentTasksPage = () => {
    const isDepartmentOpen = useStore(state => state.isDepartmentOpen);
    const isPriorityOpen = useStore(state => state.isPriorityOpen);
    const isEmployeeOpen = useStore(state => state.isEmployeeOpen);
    const {departments, priority, employee} = useStore(state => state.filters);
    const isChosenFiltersBarOpen = useStore(state => state.isChosenFiltersBarOpen);
    // const closeDepartment = useStore(state => state.closeDepartment);
    // const closePriority = useStore(state => state.closePriority);
    // const closeEmployee = useStore(state => state.closeEmployee);
    const tasks = useStore(state => state.tasks);
    const isModalOpen = useStore(state => state.isModalOpen);

    const chosenFilters = [...departments, ...priority, ...employee];

    const [filteredTasks, setFilteredTasks] = useState(tasks);

//     useEffect(() => {
//     const handleScroll = () => {
//         closeDepartment();
//         closePriority();
//         closeEmployee();
//     }
//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
// }, [])

    useEffect(() => {
      setFilteredTasks(tasks);
  }, [tasks]);

  return (
    <main>
      <h1 className = "font-serif w-1/3 h-[41px] font-semibold text-[34px] pt-[40px]">დავალებების გვერდი</h1>
      <FilterBar />
      {isChosenFiltersBarOpen && <ChosenFiltersBar setFilteredTasks = {setFilteredTasks} filteredTasks={filteredTasks}/>}
      {isDepartmentOpen && <FilterDropdown setFilteredTasks = {setFilteredTasks}/>}
      {isPriorityOpen && <FilterDropdown  setFilteredTasks = {setFilteredTasks}/>}
      {isEmployeeOpen && <FilterDropdown setFilteredTasks = {setFilteredTasks}/>}
      <TasksGrid filteredTasks = {filteredTasks}/>
      {isModalOpen && <Modal />}
    </main>
  )
}

export default CurrentTasksPage