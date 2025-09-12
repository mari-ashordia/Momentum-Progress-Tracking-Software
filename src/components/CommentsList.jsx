import React from 'react'
import { useStore } from '../store/useStore'
import { CommentComp } from './CommentComp';

export const CommentsList = () => {
    const comments = useStore(state => state.comments);

  return (
    <div className = {`relative p-[10px] ml-4 overflow-y-auto h-75`}>
        {comments?.map(({text, parent_id, author_avatar, author_nickname, sub_comments, id}) => (
            <CommentComp 
              key = {id} 
              id = {id}
              text = {text} 
              parentId = {parent_id}
              avatar = {author_avatar} 
              nickname = {author_nickname}
              subComment = {sub_comments}
            />
        ))}
    </div>
  )
}
