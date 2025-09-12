import { PiArrowBendUpLeftFill } from "react-icons/pi";
import { useStore } from "../store/useStore";
import { useState } from "react";
import { CommentBox } from "./CommentBox";
export const CommentComp = ({id, text, avatar, nickname, subComment}) => {
  const addComment = useStore(state => state.addComment);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const commentError = useStore(state => state.commentError);
  const [replyId, setReplyId] = useState(null);

  const handleReply = () => {
      setIsReplyOpen(true);
      setReplyId(id);
  }
  
  const subCommentClone = [...subComment];
  subCommentClone.reverse();
  return (
    <div className = {`mb-7`}>
        <div className = "flex gap-1.5">
            <img src = {avatar} alt = "avatar" className = "w-[36px] h-[36px] rounded-[40px]"/>
            <div className = "flex flex-col w-full">
                <p className = "text-[18px] font-[500] text-[#212529]">{nickname}</p>
                <p className = "font-[350] text-[#343A40]">{text}</p>       
                    {!isReplyOpen && (
                      <button onClick = {() => handleReply()} className  = "flex gap-1 mt-1 cursor-pointer">
                        <PiArrowBendUpLeftFill size = {16} color = "#8338EC"/>
                        <p  className = "cursor-pointer text-[12px] text-[#8338EC]"
                        >უპასუხე</p>
                      </button>
                    )}
                {isReplyOpen && (
                  <CommentBox isReplyOpen = {isReplyOpen} id = {id} replyId = {replyId} setIsReplyOpen={setIsReplyOpen} className = {{textAreaStyle: "-mt-2 -ml-6", buttonStyle: "-translate-x-13"}} showClose={true}>
                    {commentError.post && (
                      <div>
                        {commentError.post}
                      </div>
                    )}
                  </CommentBox>
                )}
                <div>
                  {subComment.length > 0 && subCommentClone.map((comment) => 
                    (
                      <div className = "flex gap-1.5 mt-4" key = {comment.id}>
                        <img src = {comment.author_avatar} alt = "avatar" className = "w-[36px] h-[36px] rounded-[40px]"/>
                        <div className = "flex flex-col">
                          <p className = "text-[18px] w-[100px] font-[500] text-[#212529]">{comment.author_nickname}</p>
                          <p className = "font-[350] text-[#343A40]">{comment.text}</p>
                        </div>
                      </div>
                  ))}
                </div>
            </div>
        </div>
    </div>
  )
}
