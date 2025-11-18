import React, { useEffect, useState } from 'react';
import styles from './CommentsPanel.module.scss';
import { fetchComments } from '../../api/mockServer';
import CommentList from '../CommentList/CommentList';
import CommentInput from '../CommentInput/CommentInput';
import type { Comment } from '../../types';
import { useVeltClientMock } from '../../veltMock/VeltProviderMock';

export default function CommentsPanel({ jobId, currentUserId }:{jobId:string;currentUserId:string}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyTo, setReplyTo] = useState<string|null>(null);
  const { client } = useVeltClientMock();

  const load = async () => {
    const c = await fetchComments(jobId);
    setComments(c);
  };

  useEffect(()=>{ load(); }, [jobId]);

  const onPosted = (newComment: Comment) => {
    // flat list: append then reload for simplicity
    setComments(prev => [...prev, newComment].sort((a,b)=>a.createdAt - b.createdAt));
    setReplyTo(null);
  };

  useEffect(()=>{
    // identify current user with Velt (mock)
    client?.identify?.({ userId: currentUserId, name: 'Nikesh H M', email: 'nikesh@oe.com' });
  }, [currentUserId]);

  return (
    <div className={styles.panel}>
      <CommentList comments={comments} currentUserId={currentUserId} onReply={(id)=>setReplyTo(id)} />
      <div style={{height:12}}/>
      <CommentInput
        jobId={jobId}
        currentUserId={currentUserId}
        replyTo={replyTo}
        onPosted={onPosted}
      />
    </div>
  );
}
