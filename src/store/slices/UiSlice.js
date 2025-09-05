export const createUiSlice = (set, get) => ({
    isDepartmentOpen: false,
    isPriorityOpen: false,
    isEmployeeOpen: false,
    isChosenFiltersBarOpen: false,
    isModalOpen: false,

    setIsDepartmentOpen: () => set(state => ({isDepartmentOpen: !state.isDepartmentOpen})),
    setIsPriorityOpen: () => set(state => ({isPriorityOpen: !state.isPriorityOpen})),
    setIsEmployeeOpen: () => set(state => ({isEmployeeOpen: !state.isEmployeeOpen})),
    closeDepartment: () => set({isDepartmentOpen: false}),
    closePriority: () => set({isPriorityOpen: false}),
    closeEmployee: () => set({isEmployeeOpen: false}),
    openChosenFiltersBar: () => set({isChosenFiltersBarOpen: true}),
    closeChosenFiltersBar: () => set({isChosenFiltersBarOpen: false}),
    openModal: () => set({isModalOpen: true}),
    closeModal: () => set({isModalOpen: false})
})