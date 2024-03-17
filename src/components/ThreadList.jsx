import { useEffect } from 'react';
import threadService from '../services/threads';
import { useDispatch, useSelector } from 'react-redux';
import { initializeThreads } from '../reducers/threadReducer';

const ThreadList = () => {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.thread.threads);

  useEffect(() => {
    threadService.getAll().then((data) => {
      dispatch(initializeThreads(data));
    });
  }, [dispatch, threads]);

  return (
    <div className="text-zinc-100 py-12">
      {threads.map((post) => (
        <div className="bg-zinc-700 my-2 p-2 text-sm" key={post.id}>
          <h1 className="font-bold">{post.title}</h1>
          <div>{post.content}</div>
        </div>
      ))}
    </div>
  );
};

export default ThreadList;
