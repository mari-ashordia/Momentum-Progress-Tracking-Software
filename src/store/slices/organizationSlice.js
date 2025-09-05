import { axiosInstance } from "../../utils/axiosInstance";

export const createOrganizationSlice = (set, get) => ({
    departments: [],
    priorities: [],
    employees: [],
    statuses: [],
    tasks: [],
    departmentsLoading: false,
    prioritiesLoading: false,
    employeesLoading: false,
    statusesLoading: false,
    tasksLoading: false,
    departmentsError: null,
    prioritieseError: null,
    employeeseError: null,
    statusesError: null,
    tasksError: null,

    fetchDepartments: async () => {
        set({departmentsLoading: true});
        try{
            const {data} = await axiosInstance.get('/departments');
            set({departmentsLoading: false, departments: data});
        }
        catch(err){
            set({departmentsLoading: false, departmentsError: err.message})
        }
    },

    fetchPriorities: async () => {
        set({prioritiesLoading: true});
        try{
            const {data} = await axiosInstance.get('/priorities');
            set({prioritiesLoading: false, priorities: data});
        }
        catch(err){
            set({prioritiesLoading: false, prioritieseError: err.message})
        }
    },

    fetchEmployees: async () => {
        set({employeesLoading: true});
        try{
            const {data} = await axiosInstance.get('/employees');
            set({employeesLoading: false, employees: data});
        }
        catch(err){
            set({employeesLoading: false, employeeseError: err.message})
        }
    },

    fetchStatuses: async () => {
        set({statusesLoading: true});
        try{
            const {data} = await axiosInstance.get('/statuses');
            set({statusesLoading: false, statuses: data});
        }
        catch(err){
            set({statusesLoading: false, statusesError: err.message});
            console.log(err.message);
        }
    },

    fetchTasks: async () => {
        set({tasksLoading: true});
        try{
            const {data} = await axiosInstance.get('/tasks');
            set({tasksLoading: false, tasks: data});
        }
        catch(err){
            set({tasksLoading: false, tasksError: err.message});
            console.log("error is: ",err.message);
        }
    }

})