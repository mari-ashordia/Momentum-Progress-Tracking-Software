import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useStore } from '../store/useStore'
import { departmentShortNames } from '../assets/utils/constants/departmentShortNames';
import { axiosInstance } from '../utils/axiosInstance';
import { validation } from '../assets/utils/formValidation';
import { RiDeleteBin6Line } from "react-icons/ri";

export const Modal = () => {
    const closeModal = useStore(state => state.closeModal);
    const [employee, setEmployee] = useState(
        {
            name: "",
            surname: "",
            avatar: {},
            department_id: null
        });
    const [errors, setErrors] = useState({});
    const [avatarPreview, setAvatarPreview] = useState("");
    const [isDirty, setIsDirty] = useState({
        name: false,
        surname: false,
        avatar: false,
        department_id: false
    })
    const {name, surname, avatar, department_id} = employee;
    const avatarRef = useRef(null);
    console.log("employee: ", employee);
    const [dep] = departmentShortNames.filter(({id}) => id === department_id);
    const handleInput = (e) => {
        setIsDirty(prev => ({...prev, [e.target.name]: true}))
        if(e.target.name === "department_id"){
            const [department] = departmentShortNames.filter(dep => dep.name === e.target.value);
            setEmployee(prev => ({
                ...prev,
                [e.target.name]: department?.id
            }))
        }else {
            setEmployee((prev) => ({
                ...prev,
                [e.target.name]: e.target.value
            }));
        }   
    }

    const handleAvatar = (e) => {
        const avatar = e.target.files[0];
        setIsDirty(prev => ({...prev, avatar: avatar}))
        setEmployee((prev) => ({
            ...prev,
            avatar: avatar
        }));
        const avatarPrev = URL.createObjectURL(avatar);
        setAvatarPreview(avatarPrev);    
    }
    const handleDeleteAvatar = () => {
        setEmployee(prev => ({
            ...prev,
            avatar: null
        }))
        setAvatarPreview("");
        avatarRef.current.value = "";
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            const validationResult = validation(employee);
            setErrors(validationResult); 
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
    }, [employee])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validation(employee);
        const formData = new FormData();
        formData.append("name", employee.name);
        formData.append("surname", employee.surname);
        formData.append("avatar", employee.avatar);
        formData.append("department_id", employee.department_id);
        if(Object.keys(errors).length > 0){
            setErrors(errors);
            return;
        }
        try{
            const {data} = await axiosInstance.post("/employees", formData);
            alert("Employee added successfully!!!");
        }
        catch(err) {
            alert(err.message);
        }
    const dep = departmentShortNames.filter((val) => val.id === employee.department_id);
    }
  return createPortal(
    <div className = "flex justify-center">
        <div onClick = {() => closeModal()} className = "fixed inset-0 bg-black/50 backdrop-blur-xs z-50"/>
        <div className = " overflow-hidden absolute top-[80px] bg-white w-[700px] h-[570px] border-transparent rounded-[10px] z-50">
            <div className = "relative left-[92%] top-5">
                <div className = "border border-transparent bg-[#DEE2E6] w-[30px] h-[30px] rounded-[50%] flex justify-center items-center">
                    <button onClick = {() => closeModal()} className = "text-white text-3xl cursor-pointer relative bottom-0.5">&times;</button>
                </div>
            </div>

            <form onSubmit={(e) => handleSubmit(e)} className = "w-[90%] mx-auto my-[50px]">
                <h1 className = "font-bold text-[28px] text-center text-[#212529]">თანამშრომლის დამატება</h1>
                <div className = "flex mt-7 w-full">
                    <div className = "w-full">
                        <label htmlFor = "name" className = "text-[#343A40] text-[14px]">სახელი*</label>
                        <input type = "text" value = {name} name = "name" onChange = {(e) => handleInput(e)} id = "name" className = "border border-[#CED4DA] rounded-[6px] w-[270px] h[40px] py-[5px] px-[10px] focus:border-[#8338EC]"/>
                        {/* {(!name && isDirty) && errors.name?.required} */}
                        {/* {errors.name && Object.keys(errors.name).filter(val => val !== 'required').map(str => (
                            <div className = "text-[#6C757D] text-[10px]">
                                &#10003; {str}
                            </div> */}
                        {/* ))} */}
                        {
                           (isDirty.name && errors.name) && (Object.values(errors.name).map(str => (
                            <div key = {str} className = "text-[#6C757D] text-[10px]">
                                &#10003; {str}
                            </div>
                        ))) 
                        }
                    </div>
                    <div className = "w-full flex flex-col relative top-[2px]">
                        <label htmlFor = "surname" className = "text-[#343A40] text-[14px]">გვარი*</label>
                        <input type = "text" value = {surname} name = "surname" onChange = {(e) => handleInput(e)} id = "surname" className = "border border-[#CED4DA] rounded-[6px] py-[5px] w-[270px] h[40px] px-[10px] focus:border-[#8338EC]" />
                        {(isDirty.surname && errors.surname) && (Object.values(errors.surname).map(str => (
                            <div key = {str} className = "text-[#6C757D] text-[10px]">
                                &#10003; {str}
                            </div>
                        )))}
                    </div>
                </div>
                <div className = "flex flex-col relative mt-4">
                    <label hmtlFor = "avatar" className = "text-[#343A40] text-[14px]">ავატარი*</label>
                    <input ref = {avatarRef} type = "file" name = "avatar" onChange = {(e) => handleAvatar(e)} className = "border border-dashed border-[#CED4DA] rounded-[6px] h-[120px] text-[#343A40] text-[14px] focus:border-[#8338EC]"/>
                    {avatarPreview && (
                        <div className = "absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                            <img className = "w-[88px] h-[88px] border border-transparent rounded-[50%]" src = {avatarPreview} alt = "avatar preview"/>
                            <button onClick = {handleDeleteAvatar} className = "cursor-pointer absolute bottom-0 right-1 bg-white flex justify-center items-center border border-[#9ca1a5] rounded-[50%] w-[24px] h-[24px]">
                                <RiDeleteBin6Line size = {13} color = "#9ca1a5"/>
                            </button>
                        </div>
                    )}
                    {(isDirty.avatar && errors.avatar) && (Object.values(errors.avatar).map(str => (
                            <div key = {str} className = "text-[#6C757D] text-[10px]">
                                &#10003; {str}
                            </div>
                        )))}
                </div>
                <div className = "mt-5 flex flex-col">
                    <label htmlFor = "department_id" className = "text-[#343A40] text-[14px]">დეპარტამენტი*</label>
                    <select name = "department_id" value = {dep?.name} onChange = {(e) => handleInput(e)} className = "border border-[#CED4DA] rounded-[6px] py-[5px] w-[270px] h[40px] px-[10px] focus:border-[#8338EC]">
                        <option value = "">Choose a department</option>
                        {departmentShortNames.map(({name,shortName, id}) => (
                            <option key = {id} value = {name}>{shortName}</option>
                        ))}
                    </select>
                    {(isDirty.department_id && errors.department) && (Object.values(errors.department).map(str => (
                            <div key = {str} className = "text-[#6C757D] text-[10px]">
                                &#10003; {str}
                            </div>
                        )))}
                </div>

                <div className = "mt-5 flex gap-4 justify-end">
                    <button onClick = {() => closeModal()} className = "font-serif border-[1px] border-[#8338EC] py-[10px] px-[20px] rounded-[5px] text-[16px] text-[#212529] font-[400] cursor-pointer">გაუქმება</button>
                    <button type = "submit" className = "font-serif border-[1px] border-[#8338EC] py-[10px] px-[20px] rounded-[5px] text-[16px] font-[400] bg-[#8338EC] text-white cursor-pointer">დაამატე თანამშრომელი</button>
                </div>
            </form>

        </div>
    </div>,
    document.body
  )
}
