import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createOrganizationSlice } from "./slices/organizationSlice";
import { createUiSlice } from "./slices/UiSlice";
import { createTaskFilterSlice } from "./slices/taskFilterSlice";
import { createCommentsSlice } from "./slices/commentsSlice";

export const useStore = create(persist((set, get) => ({
    ...createOrganizationSlice(set, get),
    ...createUiSlice(set, get),
    ...createTaskFilterSlice(set, get),
    ...createCommentsSlice(set, get)
}),
{
    name: 'momentum-storage',
    partialize: (state) => ({
        departments: state.departments,
        priorities: state.priorities,
        employees: state.employees,
        tasks: state.tasks,
        statuses: state.statuses
    })
}))