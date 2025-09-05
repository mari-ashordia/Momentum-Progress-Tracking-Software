export  const handleFilter = (setFilteredTasks, tasks, filterDep, filterPriority, filterEmployee) => {
            const filteredTasks = tasks.filter(task => {
            const depMatch = filterDep.includes(task.department.id) || filterDep.length === 0;
            const prioMatch = filterPriority.includes(task.priority.id) || filterPriority.length === 0;
            const empMatch = filterEmployee.includes(task.employee.id) || filterEmployee.length === 0;
            return depMatch && prioMatch && empMatch;
        });
            setFilteredTasks(filteredTasks);
            console.log("tasks : ",filterDep, filterPriority, filterEmployee);
    }