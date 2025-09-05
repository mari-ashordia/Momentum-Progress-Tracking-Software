export const filterHelper = (arrToMap, arrToFilter, type) => {
    const filterNames = arrToMap.map(elem => {
        const [filterOpt] = arrToFilter.filter(val => elem === val.id);
        return Object.keys(arrToFilter[0]).includes("surname") ? 
                {id: elem, name: filterOpt.name + " " + filterOpt.surname, type} : 
                {id: elem, name: filterOpt.name, type};
    });
    return filterNames;
}