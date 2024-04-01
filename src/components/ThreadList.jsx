import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getThreads, updateLikes } from '../reducers/threadReducer';
import { Link } from 'react-router-dom';
import ThreadForm from './ThreadForm';
import { getUsers } from '../reducers/userReducer';
import { TiArrowUpThick, TiArrowDownThick } from 'react-icons/ti';
import threadService from '../services/threads';

const ThreadList = () => {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.thread.threads);
  const loading = useSelector((state) => state.thread.loading);
  const user = useSelector((state) => state.login.user);

  const sorted = [...threads].sort((a, b) => a.created - b.created);
  console.log(sorted);

  useEffect(() => {
    dispatch(getThreads());
    dispatch(getUsers());
    // dispatch(getComments());
  }, [dispatch]);

  const addLike = (thread) => {
    const post = {
      // title: thread.title,
      // content: thread.content,
      // user: thread.user,
      // comments: thread.comments,
      likes: thread.likes + 1,
      id: thread.id,
    };
    // threadService.update(post);
    console.log(post.id);
    dispatch(updateLikes(post));
  };

  const removeLike = (thread) => {
    const post = { likes: thread.likes - 1, id: thread.id };
    dispatch(updateLikes(post));
  };

  if (loading) return <div>loading...</div>;

  return (
    <div className="text-zinc-100 mt-24">
      {user && <ThreadForm />}
      {sorted.map((post) => (
        <div className="bg-zinc-700 my-2 p-2 text-sm flex items-center" key={post.id}>
          <div className="flex flex-col items-center">
            <TiArrowUpThick
              className="w-6 h-6 cursor-pointer hover:text-green-500"
              onClick={() => addLike(post)}
            />
            <span className="font-bold">{post.likes}</span>
            <TiArrowDownThick
              className="w-6 h-6 cursor-pointer hover:text-red-500"
              onClick={() => removeLike(post)}
            />
          </div>
          <Link to={`/posts/${post.id}`}>
            <div className="ml-5">
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
