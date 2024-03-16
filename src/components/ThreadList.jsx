import { useEffect } from 'react';
import { useState } from 'react';
import threadService from '../services/threads';

const ThreadList = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    threadService.getAll().then((data) => {
      setThreads(data);
    });
  }, []);
  return (
    <div className="text-zinc-100 py-12">
      {threads.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};

export default ThreadList;
