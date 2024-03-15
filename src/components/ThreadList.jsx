import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const ThreadList = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/posts').then((response) => {
      setThreads(response.data);
    });
  });
  return (
    <div className="text-3xl font-bold underline">
      {threads.map((post) => (
        <div>{post.content}</div>
      ))}
    </div>
  );
};

export default ThreadList;
