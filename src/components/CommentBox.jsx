import { useCommentInput } from '../assets/utils/customHooks/useCommentInput';
import { useParams } from 'react-router-dom';

export const CommentBox = ({isReplyOpen,id, setIsReplyOpen, replyId, parentId, children, className = {}, showClose}) => {
    const {taskId} = useParams();
    const { 
      text,  
      handleComment,
      handleCommentSubmit
    } = useCommentInput(taskId, id);
    
  return (
    <div>
        {showClose && <button onClick = {() => setIsReplyOpen(false)} className = "cursor-pointer text-[20px] absolute z-50 left-[510px] translate-y-5">&times;</button>}
        <textarea value = {text} onChange = {(e) => handleComment(e)} className = {`comment-area ${className.textAreaStyle}`} placeholder = "დაწერე კომენტარი" />
        <button onClick = {() => {
          handleCommentSubmit();
          setIsReplyOpen(false)
          // setIsReplyOpen(false);
        }} className = {`comment-button ${className.buttonStyle}`}>დააკომენტარე</button>
        {children}
    </div>
  )
}
