import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { downVote, getComments, getThreads, upVote } from '../reducers/threadReducer';
import { Link } from 'react-router-dom';
import ThreadForm from './ThreadForm';
import { getUsers } from '../reducers/userReducer';
import { TiArrowUpThick, TiArrowDownThick } from 'react-icons/ti';
import { getImages } from '../reducers/imageReducer';

const ThreadList = () => {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.thread.threads);
  const loading = useSelector((state) => state.thread.loading);
  const user = useSelector((state) => state.login.user);
  const comments = useSelector((state) => state.thread.comments);
  const images = useSelector((state) => state.images);

  const sorted = [...threads].sort((a, b) => a.created - b.created);

  useEffect(() => {
    dispatch(getThreads());
    dispatch(getUsers());
    dispatch(getComments());
    dispatch(getImages());
    console.log('use effect');
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
      author: thread.author.id,
    };

    dispatch(upVote(post));
  };

  const removeLike = (thread) => {
    const findUp = thread.upVotes.find((userId) => userId === user.id);
    console.log('findup', findUp);
    const post = {
      likes: thread.likes - 1,
      id: thread.id,
      upVotes: findUp ? thread.upVotes.filter((userId) => userId !== user.id) : thread.upVotes,
      downVotes: !findUp ? thread.downVotes.concat(user.id) : thread.downVotes,
      author: thread.author.id,
    };

    console.log('author.id', thread.author);

    dispatch(downVote(post));
  };

  if (loading || !images) return <div className="text-zinc-100">loading...</div>;

  if (!user)
    return (
      <div className="grid grid-cols-1 md:grid-cols-8 gap-y-2">
        {sorted.map((post) => {
          const numberOfComments = comments.filter((c) => c.thread === post.id);
          const image = images.find((image) => image.threadId === post.id);
          return (
            <div
              className="md:col-start-2 md:col-span-6 md:bg-zinc-800 text-zinc-100 p-2 text-sm flex items-center md:rounded border border-zinc-700"
              key={post.id}
            >
              <div className="flex flex-col items-center">
                <TiArrowUpThick className="w-6 h-6" />
                <span className="font-bold">{post.likes}</span>
                <TiArrowDownThick className="w-6 h-6" />
              </div>
              <Link to={`/posts/${post.id}`} className="grow">
                <div className="grid grid-cols-4">
                  <h1 className="font-bold text-base col-span-2">{post.title}</h1>
                  {image && (
                    <img
                      src={image.url}
                      className="rounded col-start-4 row-span-2 place-self-end"
                      alt="alt"
                    />
                  )}{' '}
                  <div className="text-xs mt-2 col-start-1 self-end">
                    {numberOfComments.length} comments
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-8 gap-y-2">
      {user && (
        <div className="flex justify-center md:col-start-2 md:col-span-2 place-self-start">
          <ThreadForm />
        </div>
      )}
      {sorted.map((post) => {
        const numberOfComments = comments.filter((c) => c.thread === post.id);
        const image = images.find((image) => image.threadId === post.id);

        return (
          <div
            className="md:col-start-2 md:col-span-6 flex items-center gap-2 bg-zinc-200 md:text-zinc-800 p-2 text-sm md:rounded"
            key={post.id}
          >
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
                <TiArrowDownThick className="w-6 h-6 text-orange-600" />
              ) : (
                <TiArrowDownThick
                  className="w-6 h-6 cursor-pointer hover:text-orange-600"
                  onClick={() => removeLike(post)}
                />
              )}
            </div>
            <Link to={`/posts/${post.id}`} className="grow">
              <div className="grid grid-cols-4">
                <h1 className="font-bold text-base col-span-2">{post.title}</h1>
                {image && (
                  <img
                    src={image.url}
                    className="rounded col-start-4 row-span-2 place-self-end"
                    alt="alt"
                  />
                )}{' '}
                <div className="text-xs mt-2 col-start-1 self-end">
                  {numberOfComments.length} comments
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ThreadList;
