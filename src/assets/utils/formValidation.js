export const validation = (values) => {
    const errors = {};
    const regex = /^[ა-ჰa-zA-Z]+$/;
    if(!values.name) errors.name = {required: "სახელი სავალდებულოა"};
    if(!regex.test(values.name)) errors.name = {chars: "სახელი უნდა შეიცავდეს მხოლოდ ქართულ ან ლათინურ სიმბოლოებს"};    
    if(values.name.length < 2) errors.name = {min: "მინიმუმ 2 სიმბოლო"};
    if(values.name.length > 255) errors.name = {max: "მაქსიმუმ 255 სიმბოლო"};

    if(!values.surname) errors.surname = {required: "გვარი სავალდებულოა"};
    if(!regex.test(values.surname)) errors.surname = {chars: "გვარი უნდა შეიცავდეს მხოლოდ ქართულ ან ლათინურ სიმბოლოებს"};    
    if(values.surname.length < 2) errors.surname = {min: "მინიმუმ 2 სიმბოლო"};
    if(values.surname.length > 255) errors.surname = {max: "მაქსიმუმ 255 სიმბოლო"};

    if(!values.avatar) errors.avatar = {required: "ავატარი სავალდებულოა"};
    if(!values.avatar?.type?.startswith("image/")) errors.avatar = {format: "უნდა იყოს სურათის ტიპის ფაილი"};
    if(values.avatar?.size > 600 * 1024) errors.avatar = {size: "მაქსიმუმ 600kb ზომაში"};

    if(!values.department) errors.department = {required: "დეპარტამენტის არჩევა სავალდებულოა"}

    return errors;
}