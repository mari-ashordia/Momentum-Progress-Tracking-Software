import { IoIosArrowDown } from "react-icons/io";
import { useStore } from "../store/useStore";
const FilterBar = () => {
    const setIsDepartmentOpen = useStore(state => state.setIsDepartmentOpen);
    const setIsPriorityOpen = useStore(state => state.setIsPriorityOpen);
    const setIsEmployeeOpen = useStore(state => state.setIsEmployeeOpen);
    const closeDepartment = useStore(state => state.closeDepartment);
    const closePriority = useStore(state => state.closePriority);
    const closeEmployee = useStore(state => state.closeEmployee);
    
  return (
    <div className = "flex h-[44px] w-[688px] gap-[45px] border-[1px] border-[#DEE2E6] rounded-[10px] justify-around items-center mt-[80px]">
        <div className = "filter-div">
            <p className = "filter-text">დეპარტამენტი</p>
            <IoIosArrowDown 
                className = "down-arrow" 
                onClick = {() => {
                        setIsDepartmentOpen();
                        closePriority();
                        closeEmployee();
                    }}/>
        </div>
        <div className = "filter-div">
            <p className = "filter-text">პრიორიტეტი</p>
            <IoIosArrowDown 
                className = "down-arrow" 
                onClick = {() => {
                        setIsPriorityOpen();
                        closeEmployee();
                        closeDepartment();
                    }}/>
        </div>
        <div className = "filter-div">
            <p className = "filter-text">თანამშრომელი</p>
            <IoIosArrowDown 
                className = "down-arrow" 
                onClick = {() => {
                        setIsEmployeeOpen();
                        closeDepartment();
                        closePriority();
                    }}/>
        </div>
    </div>
  )
}

export default FilterBar