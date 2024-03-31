import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, getThreads } from '../reducers/threadReducer';
import { Link } from 'react-router-dom';
import ThreadForm from './ThreadForm';
import { getUsers } from '../reducers/userReducer';

const ThreadList = () => {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.thread.threads);
  const loading = useSelector((state) => state.thread.loading);
  const user = useSelector((state) => state.login.user);
  const users = useSelector((state) => state.users);
  console.log(users);

  useEffect(() => {
    dispatch(getThreads());
    dispatch(getUsers());
    // dispatch(getComments());
  }, [dispatch]);

  if (loading) return <div>loading...</div>;

  return (
    <div className="text-zinc-100 mt-24">
      {user && <ThreadForm />}
      {threads.map((post) => (
        <div className="bg-zinc-700 my-2 p-2 text-sm" key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <div>
              <h1 className="font-bold">{post.title}</h1>
              <div>{post.content}</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ThreadList;
