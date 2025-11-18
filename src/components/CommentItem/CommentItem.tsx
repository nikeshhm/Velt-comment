import React from 'react';
import styles from './CommentItem.module.scss';
import type { Comment } from '../../types';

export default function CommentItem({ comment, currentUserId, onReply }:{comment:Comment;currentUserId:string;onReply:()=>void}) {
  const avatar = comment.authorId.charAt(1).toUpperCase();
  const author = comment.authorId;
  const replying = comment.parentId ? true : false;

  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <div className={styles.avatar}>{avatar}</div>
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <div className={styles.name}>{author}</div>
          <div className={styles.time}>{new Date(comment.createdAt).toLocaleString()}</div>
        </div>

        <div className={styles.text}>
          {replying && <span className={styles.replyBadge}>Reply</span>}
          {comment.body}
        </div>

        <div className={styles.actions}>
          <button className={styles.replyBtn} onClick={onReply}>Reply</button>
        </div>
      </div>
    </div>
  );
}
