import { isValidElement } from "react";
import { axiosInstance } from "../../utils/axiosInstance"

export const createCommentsSlice = (set, get) => ({
    comments: [],
    commentLoading: {
        get: false,
        post: false
    },
    commentError: {
        get: false,
        post: false
    },
    isValidComment: false,

    addComment: async (text, taskId, id) => {
        const [parentComment] = get().comments.filter(comment => comment.id === id);
        if(id) {
            try {
                set({commentLoading: {get: false, post: true}});
                const commentObj = {text, parent_id: parentComment.id};
                const resp = await axiosInstance.post(`/tasks/${taskId}/comments`, commentObj);
                set({commentLoading: {get: false, post: false}});
                get().fetchComments(taskId);
                alert("Comment added successfully!");
            }
            catch(err) {
                set({commentLoading: {get: false, post: false}, commentError: {get: false, post: err.message}});
                alert(err.message);
            }
            return;
        }

        try {
            set({commentLoading: {get: false, post: true}});
            const commentObj = {text}
            const resp = await axiosInstance.post(`/tasks/${taskId}/comments`, commentObj);
            get().fetchComments(taskId);
            set({commentLoading: {get: false, post: false}});
            alert("Comment added successfully!");
        }
        catch(err) {
            set({commentLoading: {get: false, post: false}, commentError: {get: false, post: err.message}});
            alert(err.message);
        }
    },
    fetchComments: async (taskId) => {
        set({commentLoading: {get: true, post: false}});
        try{
            const {data} = await axiosInstance.get(`/tasks/${taskId}/comments`);
            set({comments: data, commentLoading: {get: false, post: false}});
        }
        catch(err) {
            set({commentLoading: {get: false, post: false}, commentError: {get: err.message, post: false}});
            alert(err.message);
        }
    },
    setIsValidComment: (boolean) => set({isValidComment: boolean})
})