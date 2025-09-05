import React, { useState } from 'react'
import { useStore } from '../../../store/useStore';

export const useCommentInput = ( taskId, id) => {
    const addComment = useStore(state => state.addComment);
    const setIsValidComment = useStore(state => state.setIsValidComment);
    const [text, setText] = useState("");
    const handleComment = (e) => {
        setText(e.target.value);
}
    const handleCommentSubmit = () => {
    const trimmedText = text.trim();
    if(trimmedText.length > 0) {
        setIsValidComment(true);
        addComment(text, taskId, id);
        setText("");
 }
    else alert("Invalid comment!");
}
  return {text, setText, handleComment, handleCommentSubmit}
}
