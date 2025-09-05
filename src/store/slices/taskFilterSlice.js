export const createTaskFilterSlice = (set, get) => ({
    filters: {
        departments: [],
        priority: [],  
        employee: []
    },

    setFilters: (filterType, filterValue) => {
        set((state) => {
            if(state.filters[filterType].includes(filterValue)) {
                return {filters: {...state.filters, [filterType]: state.filters[filterType].filter(val => val !== filterValue)}};
            }
            else 
                return {filters: {...state.filters, [filterType]: [...state.filters[filterType], filterValue]}};
        });
    },
    removeFilter: (type, id, name) => {
        const updated = get().filters[type].filter(val => val !== id);
        set(state => ({filters: {...state.filters, [type]: [...updated]}}));
    },
    clearFilters: () => set({filters: {departments: [], priority: [], employee: []}})
})