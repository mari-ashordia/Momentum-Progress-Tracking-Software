import { useStore } from "../store/useStore";
import { useEffect, useRef, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { newTaskFormValidation } from "../assets/utils/newTaskFormValidation";
import { Modal } from "../components/Modal";
import { axiosInstance } from "../utils/axiosInstance";
import { DateFormat } from "../assets/ydmDateFormat";


const CreateTaskPage = () => {
  const status = useStore(state => state.statuses);
  const priority = useStore(state => state.priorities);
  const department = useStore(state => state.departments);
  const employee = useStore(state => state.employees);
  const openModal = useStore(state => state.openModal);
  const isModalOpen = useStore(state => state.isModalOpen);
  const fetchTasks = useStore(state => state.fetchTasks);

  const [taskData, setTaskData] = useState({
    header: "",
    description: "",
    priority: "",
    status: "",
    department: "",
    employee: "",
    deadline: ""
  })
  const [errors, setErrors] = useState({});
  const [isDepartmentSelected, setIsDepartmentSelected] = useState(false);
  console.log("taskdata: ",taskData);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const [startDate, setStartDate] = useState(tomorrow);
  const datePickerRef = useRef();

  const priorityIconFunc = (name) => {
    if(name === "დაბალი") return priority[0].icon;
    if(name === "საშუალო") return priority[1].icon;
    if(name === "მაღალი") return priority[2].icon;
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setTaskData(prev => {
      return {...prev, [name]: value}
    })
    name === "department" && setIsDepartmentSelected(true);
  }

    useEffect(() => {
    const timer = setTimeout(() => {
      const validationErrors = newTaskFormValidation(taskData);
      setErrors(validationErrors);
    },1000 )
    return () => clearTimeout(timer);
  }, [taskData])

    const handleDate = (date) => {
    setStartDate(date);
    const postdateFormat = DateFormat(date);
    setTaskData(prev => ({...prev, deadline: postdateFormat}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = newTaskFormValidation(taskData);
    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const postData = {
        name: taskData.header,
        description: taskData.description,
        due_date: taskData.deadline,
        status_id: taskData.status,
        employee_id: taskData.employee,
        priority_id: taskData.priority
      }
      console.log("postData: ",postData);
      const {data} = await axiosInstance.post("/tasks", postData);
      fetchTasks();
          setTaskData({
            header: "",
            description: "",
            priority: "",
            status: "",
            department: "",
            employee: "",
            deadline: ""
        })
      setStartDate(tomorrow);
      alert("Task added successfully");
    }
    catch(err) {
      alert(err.message);
    } 
  }
  const disableButton = Object.keys(newTaskFormValidation(taskData)).length;
  return (
    <div>
      <h1 className = "text-[#212529] font-[600] text-[34px] mt-[40px]">შექმენი ახალი დავალება</h1>
      <div className = "relative mt-[20px] m-auto h-[70vh] bg-[#FBF9FFA6] border-[0.3px] border-[#DDD2FF] rounded-[4px]">
        <form onSubmit = {(e) => handleSubmit(e)}>
          <div className = "flex gap-[80px] ml-[55px] mt-[50px]">
            <div className = "flex flex-col">
              <div className = "flex flex-col mb-2">
                <label for = "header" className = "py-[6px] text-[#343A40] text-[16px]">სათაური*</label>
                <input id = "header" name = "header" value = {taskData.header} onChange = {(e) => handleChange(e)} className = "w-500px h-[50px] border text-[#0D0F10] text-[14px] font-[300] bg-white rounded-[5px] border-[#DEE2E6] p-[14px] focus:border-[#8338EC] focus:outline-none"/>
                {errors.header && (
                  Object.values(errors.header).map((str) => (
                    <p key = {str} className = "text-[#6C757D] text-[10px] font-[350]">{str}</p>
                  ))
                )}
              </div>
              <div className = "flex flex-col mb-[12px]">
                <label for = "description" className = "py-[6px] text-[#343A40] text-[16px]">აღწერა</label>
                <textarea id = "description" name = "description" value = {taskData.description} onChange = {(e) => handleChange(e)} className = "w-[550px] h-[130px] resize-none bg-[#fff] border text-[#0D0F10] text-[14px] font-[300] border-[#DEE2E6] p-[14px] rounded-[5px] focus:border-[#8338EC] focus:outline-none"></textarea>
                {errors.description && (
                  Object.values(errors.description).map((str) => (
                    <p key = {str} className = "text-[#6C757D] text-[10px] font-[350]]">{str}</p>
                  ))
                )}
              </div>
              <div className = "flex gap-10">
                <div>
                  <label for = "priority" className = "py-[6px] text-[#343A40] text-[16px]">პრიორიტეტი*</label>
                  <div>
                    <div className = "flex gap-2">
                      <Select
                        name = "priority"
                        value={taskData.priority}
                        onChange={(e) => handleChange(e)}
                        sx = {{
                          "& .MuiOutlinedInput-notchedOutline":{border: "none"},
                          "&:hover .MuiOutlinedInput-notchedOutline":{border: "none"},
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline":{borderColor: "#8338EC", borderWidth: 0.3},
                        }}
                        className = "w-[245px] h-[50px] p-[14px] mt-[7px] border-[0.3px] text-[#0D0F10] text-[14px] font-[300] border-[#DEE2E6] bg-white flex gap-4 rounded-[5px] focus:border-[#8338EC] focus:outline-none"
                      >
                        {
                          priority.map(({id, name}) => (
                              <MenuItem key = {id} value = {id}>
                                <img className = "mr-[8px]" src = {priorityIconFunc(name)} alt = "priority icon"/>
                                <p>{name}</p>
                              </MenuItem>
                          ))
                        }
                      </Select>
                       
                    </div>
                  </div>
                </div>
                <div>
                    <div className = "flex flex-col bottom-[1px]">
                      <label for = "status" className = "text-[#343A40] text-[16px]">სტატუსი*</label>
                      <Select
                        name = "status"
                        value={taskData.status}
                        onChange={(e) => handleChange(e)}
                        sx = {{
                          "& .MuiOutlinedInput-notchedOutline":{border: "none"},
                          "&:hover .MuiOutlinedInput-notchedOutline":{border: "none"},
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline":{borderColor: "#8338EC", borderWidth: 0.3},
                        }}
                        className = "w-[245px] h-[50px] p-[14px] mt-[7px] border-[0.3px] text-[#0D0F10] text-[14px] font-[300] border-[#DEE2E6] bg-white flex gap-4 rounded-[5px] focus:border-[#8338EC] focus:outline-none"
                      >
                        {
                          status.map(({id, name}) => (
                              <MenuItem key = {id} value = {id}>
                                <p>{name}</p>
                              </MenuItem>
                          ))
                        }
                      </Select>
                    </div>
                </div>
              </div>
            </div>
                  {/* 2 div */}
            <div className = "flex flex-col gap-[7px]">
                <div className = "mb-[31px]">
                  <label for = "department" className = " my-[2px] text-[#343A40] text-[16px] flex flex-col">დეპარტამენტი*</label>
                  <Select
                    name = "department"
                    value={taskData.department}
                    onChange={(e) => handleChange(e)}
                    sx = {{
                      "& .MuiOutlinedInput-notchedOutline":{border: "none"},
                      "&:hover .MuiOutlinedInput-notchedOutline":{border: "none"},
                      "&.Mui-focused fieldset":{borderColor: "#8338EC", borderWidth: 0.3},
                    }}
                    className = "w-[500px] h-[50px] p-[14px] mt-[7px] border-[0.3px] text-[#0D0F10] text-[14px] font-[300] border-[#DEE2E6] bg-white flex gap-2 rounded-[5px] focus:border-[#8338EC] focus:outline-none"
                  >
                    {
                      department.map(({id, name}) => (
                          <MenuItem key = {id} value = {id}>{name}</MenuItem>
                      ))
                    }
                  </Select>
                </div>
                <div className = "mb-[84px] relative bottom-[8px]">
                      <label for = "employee" className = {`${!isDepartmentSelected && "text-[#ADB5BD]"} py-[6px] text-[#343A40] text-[16px]`}>პასუხისმგებელი თანამშრომელი*</label>
                      <Select 
                        disabled = {!isDepartmentSelected} 
                        name = "employee" 
                        value = {taskData.employee} 
                        onChange = {(e) => handleChange(e)} 
                        sx = {{
                          "& .MuiOutlinedInput-notchedOutline":{border: "none"},
                          "&:hover .MuiOutlinedInput-notchedOutline":{border: "none"},
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline":{borderColor: "#8338EC", borderWidth: 0.3},
                        }}
                        className = "disabled:text-[#ADB5BD] p-[14px] mt-[7px] bg-white w-[500px] h-[50px] text-[#0D0F10] text-[14px] font-[300] border-[0.3px] border-[#DEE2E6] flex gap-2 rounded-[5px] focus:border-[#8338EC] focus:outline-none">
                          <button onClick = {() => openModal()} className = "w-full">
                            <MenuItem sx = {{width: "100%"}}>დაამატე ახალი თანამშრომელი</MenuItem>
                          </button>
                        {
                          employee.filter(emp => emp.department_id === taskData.department)
                                  .map(({id, name, surname}) => (
                                      <MenuItem  key = {id} value = {id}>{name + " " + surname}</MenuItem>
                                  ))
                        }
                      </Select>
                </div>
                
                <div className = "relative bottom-[9px]">
                  <label for = "deadline" className = "text-[#343A40] text-[16px]">დედლაინი</label>
                  <div>
                    <CiCalendar size = {16} onClick = {() => datePickerRef.current.setFocus()} className = "relative top-[25px] z-50 left-3 cursor-pointer"/>
                    <DatePicker 
                      selected={startDate} 
                      onChange={(date) => handleDate(date)} 
                      dateFormat = "dd/MM/yyyy"
                      minDate = {new Date()}
                      placeholder = "dd/mm/yyyy"
                      ref = {datePickerRef}
                      className = "caret-transparent cursor-pointer w-[318px] h-[47px] bg-white p-[14px] text-[#0D0F10] text-[14px] font-[300] pl-8 -mt-[8px] border-[0.3px] focus:border-[#8338EC] border-[#DEE2E6] flex gap-2 rounded-[5px] focus:outline-none"
                  />
                  </div>
                  
                </div>
            </div>
          </div>
          <button type = "submit" disabled = {disableButton} className = {`disabled:bg-[#aaa] disabled:cursor-context-menu disabled:text-white absolute border-transparent bottom-[30px] right-[30px] border-[1px] bg-[#8338EC] py-[10px] px-[20px] rounded-[5px] text-[18px] text-white font-[400] cursor-pointer`}>დავალების შექმნა</button>
        </form>
      </div>
      {isModalOpen && <Modal />}
    </div>
  )
}

export default CreateTaskPage