export const priorityFunction = (priorityId) => {
    switch(priorityId) {
        case 1: 
            return '#08A508';
        case 2:
            return '#FFBE0B';
        case 3: 
            return '#FF0000';
        default: 'grey';
    }
}
