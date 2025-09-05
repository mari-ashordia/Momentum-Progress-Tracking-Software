import React, { useEffect } from 'react'
import { useStore } from '../store/useStore'
import { statusColors } from '../assets/utils/constants/statusColors';
import { TaskCard } from './TaskCard';
import { Link } from 'react-router-dom';

export const TasksGrid = ({filteredTasks}) => {
    const statuses = useStore(state => state.statuses);
    const fetchStatuses = useStore(state => state.fetchStatuses);
    const fetchTasks = useStore(state => state.fetchTasks); 
    useEffect(() => {
        fetchStatuses();
        fetchTasks();
    }, [fetchStatuses, fetchTasks]);


  return (
    <div className = "flex gap-[30px]">
        {
            statuses.map(({id: statusId, name: statusName}, index) => {
                return(
                <div key = {statusId} className = "flex flex-col mt-[50px]">
                    <div style = {{backgroundColor: statusColors[index]}} className = {` mb-[20px] flex justify-center items-center w-[330px] h-[54px] text-white border rounded-[10px] py-[15px] text-[20px] font-[500]`}>
                        {statusName}
                    </div>
                    {
                        filteredTasks.filter(({status: {id}}) => statusId === id).map((
                            {
                                    id: taskId,
                                    name: taskName, 
                                    description, 
                                    department: {name: departmentName}, 
                                    employee: {avatar}, 
                                    priority: {name:priorityName, icon: priorityIcon, id: priorityId}, 
                                    status: {id: statusId}, 
                                    due_date,
                                    total_comments
                                    }
                        ) => {
                            return(
                            <div key = {taskId} className = "flex flex-col mb-5">
                                <Link to = {`/tasks/${taskId}`}>
                                    <TaskCard
                                            priorityName = {priorityName} 
                                            priorityIcon = {priorityIcon}
                                            priorityId = {priorityId}
                                            department = {departmentName} 
                                            dueDate = {due_date}
                                            taskName = {taskName}
                                            taskDescription = {description}
                                            avatar = {avatar}
                                            statusId = {statusId}
                                            colorIndex = {index}
                                            taskId = {taskId}
                                            totalomments = {total_comments}
                                    />
                                    </Link>
                            </div>)
                        })
                    }
                </div>)
            })
        }
    </div>
  )
}
