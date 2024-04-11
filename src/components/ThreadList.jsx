import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { downVote, getThreads, upVote } from '../reducers/threadReducer';
import { Link } from 'react-router-dom';
import ThreadForm from './ThreadForm';
import { getUsers } from '../reducers/userReducer';
import { TiArrowUpThick, TiArrowDownThick } from 'react-icons/ti';

const ThreadList = () => {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.thread.threads);
  const loading = useSelector((state) => state.thread.loading);
  const user = useSelector((state) => state.login.user);

  const sorted = [...threads].sort((a, b) => a.created - b.created);

  useEffect(() => {
    dispatch(getThreads());
    dispatch(getUsers());
  }, [dispatch]);

  const addLike = (thread) => {
    const findDown = thread.downVotes.find((userId) => userId === user.id);
    const post = {
      likes: thread.likes + 1,
      id: thread.id,
      downVotes: findDown
        ? thread.downVotes.filter((userId) => userId !== user.id)
        : thread.downVotes,
      upVotes: !findDown ? thread.upVotes.concat(user.id) : thread.upVotes,
    };
    dispatch(upVote(post));
  };

  const removeLike = (thread) => {
    const findUp = thread.upVotes.find((userId) => userId === user.id);
    const post = {
      likes: thread.likes - 1,
      id: thread.id,
      upVotes: findUp ? thread.upVotes.filter((userId) => userId !== user.id) : thread.upVotes,
      downVotes: !findUp ? thread.downVotes.concat(user.id) : thread.downVotes,
    };
    dispatch(downVote(post));
  };

  if (loading) return <div className="text-zinc-800">loading...</div>;

  if (!user)
    return (
      <div>
        {sorted.map((post) => (
          <div className="bg-zinc-700 my-2 p-2 text-sm flex items-center rounded" key={post.id}>
            <div className="flex flex-col items-center">
              <TiArrowUpThick className="w-6 h-6" />
              <span className="font-bold">{post.likes}</span>
              <TiArrowDownThick className="w-6 h-6" />
            </div>
            <Link to={`/posts/${post.id}`}>
              <div className="ml-5">
                <h1 className="font-bold">{post.title}</h1>
                <div className="whitespace-pre">{post.content}</div>
                <div>{post.comments.length} comments</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );

  return (
    <div className="thread-btn text-zinc-100">
      {user && <ThreadForm />}
      {sorted.map((post) => {
        return (
          <div className="bg-zinc-700 my-2 p-2 text-sm flex items-center rounded" key={post.id}>
            <div className="flex flex-col items-center">
              {user.id === post.upVotes.find((userId) => userId === user.id) ? (
                <TiArrowUpThick className="w-6 h-6 text-green-500" />
              ) : (
                <TiArrowUpThick
                  className="w-6 h-6 cursor-pointer hover:text-green-500"
                  onClick={() => addLike(post)}
                />
              )}
              <span className="font-bold">{post.likes}</span>
              {user.id === post.downVotes.find((userId) => userId === user.id) ? (
                <TiArrowDownThick className="w-6 h-6 text-orange-700" />
              ) : (
                <TiArrowDownThick
                  className="w-6 h-6 cursor-pointer hover:text-orange-700"
                  onClick={() => removeLike(post)}
                />
              )}
            </div>
            <Link to={`/posts/${post.id}`}>
              <div className="ml-5">
                <h1 className="font-bold text-base">{post.title}</h1>
                <div className="whitespace-pre-wrap">{post.content}</div>
                <div className="text-xs mt-2">{post.comments.length} comments</div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ThreadList;
