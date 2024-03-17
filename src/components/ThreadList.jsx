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
        <div className="bg-zinc-700 my-2 p-2" key={post.id}>
          <h1 className="font-bold">{post.title}</h1>
          <div>{post.content}</div>
        </div>
      ))}
    </div>
  );
};

export default ThreadList;
