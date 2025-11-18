import React, { useEffect, useMemo, useState, useRef } from 'react';
import styles from './CommentInput.module.scss';
import { fetchUsers, postComment, postReply } from '../../api/mockServer';
import type { Comment } from '../../types';

export default function CommentInput({ jobId, currentUserId, replyTo, onPosted }:{jobId:string;currentUserId:string;replyTo:string|null;onPosted:(c:Comment)=>void}) {
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<Array<{id:string,name:string}>>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement|null>(null);

  useEffect(()=>{
    let mounted = true;
    if(query.length===0) { setUsers([]); setShowDropdown(false); return; }
    (async ()=>{
      const res = await fetchUsers(query);
      if(mounted){ setUsers(res); setShowDropdown(true); setHighlight(0); }
    })();
    return ()=>{ mounted=false; };
  },[query]);

  useEffect(()=>{
    // if replyTo changes, focus input
    inputRef.current?.focus();
  },[replyTo]);

  const mentions = useMemo(()=> {
    return users.filter(u=> text.includes('@'+u.name.split(' ')[0])).map(u=>u.id);
  },[text, users]);

  const submit = async () => {
    if(!text.trim()) return;
    const payload = {
      jobId, authorId: currentUserId, body:text, mentions, readBy:[currentUserId], parentId: replyTo || null
    };
    const saved = replyTo ? await postReply(payload) : await postComment(payload);
    onPosted(saved);
    setText(''); setQuery(''); setUsers([]); setShowDropdown(false);
  };

  const onKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(showDropdown && users.length>0){
      if(e.key==='ArrowDown'){ e.preventDefault(); setHighlight(i=> Math.min(i+1, users.length-1)); return; }
      if(e.key==='ArrowUp'){ e.preventDefault(); setHighlight(i=> Math.max(i-1,0)); return; }
      if(e.key==='Enter'){ e.preventDefault(); const u = users[highlight]; if(u){ insertMention(u); } return; }
    }
    if(e.key==='Enter' && !showDropdown){ e.preventDefault(); submit(); }
  };

  const insertMention = (u:{id:string,name:string})=>{
    setText(prev=>{
      const parts = prev.split('@'); parts.pop(); return parts.join('@') + '@' + u.name.split(' ')[0] + ' ';
    });
    setShowDropdown(false); setUsers([]); setQuery('');
    setTimeout(()=> inputRef.current?.focus(), 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputBox}>
        <input
          ref={inputRef}
          className={styles.input}
          placeholder={replyTo ? 'Replying...' : 'Leave a comment...'}
          value={text}
          onChange={e=>{ setText(e.target.value); const last = e.target.value.split('@').pop() || ''; setQuery(last); }}
          onKeyDown={onKeyDown}
        />
        <button className={styles.send} onClick={submit}>Send</button>
      </div>

      {showDropdown && users.length>0 && (
        <div className={styles.dropdown}>
          {users.map((u,i)=>(
            <div key={u.id} className={i===highlight? styles.itemActive:styles.item} onClick={()=>insertMention(u)}>
              {u.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
