export const newTaskFormValidation = ({header,description,priority,status,department,employee,deadline}) => {
    const errors = {};
    if(!header) errors.header = {required: "სათაური სავალდებულოა"};
    if(header && header.length < 3) errors.header = {min: "მინიმუმ 3 სიმბოლო"};
    if(header && header.length > 255) errors.header = {max: "მაქსიმუმ 255 სიმბოლო"};

    if(description && description.length < 4) errors.description = {min: "მინიმუმ 4 სიმბოლო"};
    if(description && description.length > 255) errors.description ={ max: "მაქსიმუმ 255 სიმბოლო"};

    if(!priority) errors.required = "სავალდებულო ველი";
    if(!status) errors.required = "სავალდებულო ველი";
    if(!department) errors.required = "სავალდებულო ველი";
    if(!employee) errors.required = "სავალდებულო ველი"


  return errors;
}
