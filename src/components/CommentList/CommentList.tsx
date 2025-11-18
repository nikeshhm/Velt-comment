import React from 'react';
import styles from './CommentList.module.scss';
import type { Comment } from '../../types';
import CommentItem from '../CommentItem/CommentItem';

export default function CommentList({ comments, currentUserId, onReply }:{comments:Comment[];currentUserId:string;onReply:(id:string)=>void }) {
  return (
    <div>
      {comments.map(c=>(
        <CommentItem key={c.id} comment={c} currentUserId={currentUserId} onReply={()=>onReply(c.id)} />
      ))}
    </div>
  );
}
