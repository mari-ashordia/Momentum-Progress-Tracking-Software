import React from 'react'
import { statusColors } from '../assets/utils/constants/statusColors';
import { priorityFunction } from '../assets/utils/priorityFunction';
import { Link } from 'react-router-dom';
import { monthsInGeo } from '../assets/utils/constants/monthsInGeo';
import { departmentShortNames } from '../assets/utils/constants/departmentShortNames';
import { GoComment } from "react-icons/go";
import {useStore} from "../store/useStore";
export const TaskCard = ({priorityName, totalComments, priorityIcon, priorityId, department, dueDate, taskName, taskDescription, avatar, colorIndex, taskId}) => {
    const formatDateToGeo = () => {
        const date = new Date(dueDate);
        const day = date.getDate();
        const month = monthsInGeo[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`
    }
    const statusColor = statusColors[colorIndex];
    const priorityColor = priorityFunction(priorityId); 
    const [depObj] = departmentShortNames.filter(({id, name, shortName, color}) => name === department)
  return (
    <Link to = {`/tasks/${taskId}`}>
        <div style = {{borderColor: statusColor}} className = "cursor-pointer flex flex-col border-[1px] rounded-[15px] p-[20px] w-[330px] h-[217px]">
            <div className = "flex justify-between items-center mb-2.5">
                <div className = "flex gap-3">
                    <div style = {{borderColor: priorityColor}} className = {`flex border-[0.5px] rounded-[4px] p-[4px] w-[86px] h-[26px]`} >
                        <img src = {priorityIcon} className = "w-[18px] h-[18px]" alt = {
                            `${priorityId === 1 && "low priority icon"}
                            ${priorityId === 2 && "medium priority icon"}
                            ${priorityId === 3 && "high priority icon"}`}
                        />
                        <p style = {{color: priorityColor}} className = {`font-semibold ml-1 text-[12px]`}>{priorityName}</p>
                    </div>
                    <div>
                        <div style = {{backgroundColor: depObj.color}} className = {`w-[100px] h-[30px] overflow-hidden text-white py-[5px] px-[9px] rounded-[15px] flex justify-center items-center text-[12px]`}> 
                            <p>{depObj.shortName}</p>
                        </div>
                    </div>
                </div>
                <div className = "w-[72px] text-[12px] text-[#212529]">
                    <p>{formatDateToGeo()}</p>
                </div>
            </div>

            <div className = "h-[100px]">
                <h3 className = "font-[500] text-[15px] mb-2.5 leading-5">{taskName}</h3>
                <p className = "leading-5 line-clamp-2">{taskDescription}</p>
            </div>

            <div className = "flex justify-between">
                <div className = "w-[31px] h-[31px] border-transparent rounded-2xl overflow-hidden">
                    <img src = {avatar} alt = "employee avatar"/>
                </div>
                <div className = "flex gap-1 items-center">
                    <GoComment size = {20} strokeWidth={0.1} className = "text-[#212529]"/>
                    <p className = "text-[14px] text-[#212529]">{totalComments}</p>
                </div>
            </div>
        </div>
    </Link>
  )
}
