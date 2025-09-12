import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { CiClock2 } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { departmentShortNames } from '../assets/utils/constants/departmentShortNames';
import { priorityFunction } from '../assets/utils/priorityFunction';
import { weekDaysInGeo } from '../assets/utils/constants/weekdaysInGeo';
import { axiosInstance } from '../utils/axiosInstance';
import { CommentsList } from '../components/CommentsList';
import { CommentBox } from '../components/CommentBox';
import { Modal } from '../components/Modal';


const TaskDetailsPage = () => {
  const {taskId: id} = useParams();
  const tasks = useStore(state => state.tasks);
  const [selectedTask] = tasks.filter((task)=> task.id == id);
  const {priority, status, name, description, department, employee, due_date} = selectedTask;
  const statuses = useStore(state => state.statuses);
  const addComment = useStore(state => state.addComment);
  const comments = useStore(state => state.comments);
  const fetchComments = useStore(state => state.fetchComments);
  const isModalOpen = useStore(state => state.isModalOpen);
  const [{shortName: depShort}] = departmentShortNames.filter(dep => dep.id === selectedTask.department.id);
  const priorityColor = priorityFunction(priority.id);
  // const [updatedStatus, setUpdatedStatus] = useState({
  //   status_id: null
  // });

  const [depObj] = departmentShortNames.filter(({id, name, shortName, color}) => name === department.name);

  const handleStatusChange = async (e) => {
      const [selectedStatus] = statuses.filter(status => status.name === e.target.value);
      console.log("status: ", selectedStatus);
      console.log("id: ", selectedStatus?.id);
      // setUpdatedStatus({status_id: selectedStatus.id});
      const statusObj = {status_id: selectedStatus.id}
      try {
        const resp = await axiosInstance.put(`tasks/${id}`, statusObj);
        alert("status changed successfully!");
      }
      catch(err) {
        alert(err.message);
      }

    }

  const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      const day = weekDaysInGeo[date.getDay()];
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const yyyy = date.getFullYear();

      return `${day}-${dd}/${mm}/${yyyy}`;
  }

  const allComments = () => {
    const commentsQuantity = comments.reduce((total, current) => {
        return total + 1 + current.sub_comments.length;
    }, 0)
    return commentsQuantity;
  }

  useEffect(() => {
    fetchComments(id);
  }, [])
  return (
    <div>
    <div className = "flex mt-[60px] justify-between">
      <div className = "w-[46%]">
        <div className = "flex flex-col">
          <div className = "flex gap-4">
            <div className = "flex w-[130px] gap-2 border-[0.5px] px-[5px] py-[4px] rounded-[3px]" style = {{borderColor: priorityColor}}>
              <img src = {priority.icon} alt = {
                  `${priority.id === 1 && "low priority icon"}
                  ${priority.id === 2 && "medium priority icon"}
                  ${priority.id === 3 && "high priority icon"}`}
              />
            <p className = "text-[16px] font-[500] bg-" style = {{color: priorityColor}}>{priority.name}</p>
            </div>
            <div style = {{backgroundColor: depObj.color}}className = "text-white py-[5px] px-[10px] border border-transparent rounded-[15px] text-[16px]">
              {depShort}
            </div>
          </div>
          <div className = "mt-2">
            <h1 className = "text-[34px] font-[600]">{name}</h1>
            <p className = "text-[18px] mt-6">{description}</p>
          </div>
          <div className = "mt-14">
              <h2 className = "text-[24px] font-[500] mb-[15px]">დავალების დეტალები</h2>
              <div className = "flex gap-15 py-[10px]">
                  <div className = "flex gap-1 items-center w-2/7">
                    <CiClock2 size = {24} color = "#474747"/>
                    <p className = "task-details">სტატუსი</p>
                  </div>
                  <div>
                    <select onChange = {(e) => handleStatusChange(e)} className = "border border-[#CED4DA] rounded-[5px] p-[10px] text-[#0D0F10] text-[14px] font-[300]">
                      {statuses.map(status => (
                        <option key = {status.id}>{status.name}</option>
                      ))}
                    </select>
                  </div>
              </div>
              <div className = "flex gap-15 py-[10px]">
                <div className = "flex gap-1  w-2/7">
                  <FiUser size = {24} color = "#474747"/>
                  <p className = "task-details">თანამშრომელი</p>
                </div>
                <div>
                  <div className = "flex items-center gap-2">
                    <div>
                        <img src = {employee.avatar} alt = "employee avatar" className = "w-[32px] h-[32px] border border-transparent rounded-[50%]"/>
                    </div>
                      <div classname = "flex flex-col">
                        <p className = "text-[11px] text-[#474747] font-[300]">{department.name}</p>
                        <p className = "text-[14px] text-[#0D0F10]">{employee.name + " " + employee.surname}</p>
                      </div>
                  </div>
                </div>
              </div>
              <div className = "flex gap-15 py-[10px]">
                  <div className = "flex gap-1 items-center  w-2/7">
                    <FiCalendar size = {24} color = "#474747"/>
                    <p className = "task-details">დავალების ვადა</p>
                  </div>
                  <div className = "text-[#0D0F10]">
                    {formatDate(due_date)}
                  </div>
                </div>
          </div>
        </div>
      </div>
      <div className = "w-[45%] h-[575px] bg-[rgba(221,210,255,0.4)] border-[0.3px] border-transparent rounded-[10px]">
        <CommentBox showClose={false}/>
        <div className = "flex gap-2 relative items-center top-[8px] ml-[27px] pb-6">
          <p className = "text-[20px] font-[500]">კომენტარები</p>
          <div className = "text-white bg-[#8338EC] rounded-[30px] p-[10px] w-[30px] h-[22px] text-[14px] flex justify-center items-center relative">
             <div className = "relative bottom-[0.7px]">{comments?.length > 0 ? allComments() : 0}  </div>     
          </div>
        </div>
        <div>
          <CommentsList />
        </div>
      </div>
    </div>
    {isModalOpen && <Modal />}
    </div>
  )    
}
export default TaskDetailsPage