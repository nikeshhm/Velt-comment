/**
 * Mock server: in-memory data and API-like functions.
 * Replace these with real endpoints easily.
 */

import type { Comment, User } from '../types';

let users: User[] = [
  { id: 'u1', name: 'Nikesh H M', email: 'nikesh@oe.com' },
  { id: 'u2', name: 'Kevin', email: 'kevin@oe.com' },
  { id: 'u3', name: 'Anita', email: 'anita@vendor.com' }
];

let comments: Comment[] = [
  { id: 'c1', jobId: 'J100', authorId: 'u2', body: 'Please check invoice #123', createdAt: Date.now()-600000, mentions: [], readBy: [], parentId: null },
  { id: 'c2', jobId: 'J100', authorId: 'u1', body: 'I checked — looks ok', createdAt: Date.now()-300000, mentions: [], readBy: [], parentId: 'c1' }
];

export async function fetchUsers(q: string): Promise<User[]> {
  await new Promise(r=>setTimeout(r, 200)); // simulate latency
  if(!q) return users;
  return users.filter(u=>u.name.toLowerCase().includes(q.toLowerCase()));
}

export async function fetchComments(jobId: string): Promise<Comment[]> {
  await new Promise(r=>setTimeout(r, 150));
  return comments.filter(c=>c.jobId === jobId).sort((a,b)=>a.createdAt - b.createdAt);
}

export async function postComment(payload: Omit<Comment,'id'|'createdAt'>): Promise<Comment> {
  const newC: Comment = { ...payload, id: 'c'+Math.random().toString(36).slice(2,9), createdAt: Date.now() };
  comments.push(newC);
  // simulate email send for mentions
  if(newC.mentions && newC.mentions.length>0){
    newC.mentions.forEach(uid=>{
      const u = users.find(x=>x.id===uid);
      if(u) console.info('[mock-email] sent to', u.email, 'body:', newC.body);
    });
  }
  return newC;
}

export async function postReply(payload: Omit<Comment,'id'|'createdAt'>): Promise<Comment> {
  // flat system: reply is same as comment but with parentId set
  return postComment(payload);
}
