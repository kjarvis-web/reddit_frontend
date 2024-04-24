import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { downVote, getComments, getThreads, upVote } from '../reducers/threadReducer';
import { Link } from 'react-router-dom';
import ThreadForm from './ThreadForm';
import { getUsers } from '../reducers/userReducer';
import { TiArrowUpThick, TiArrowDownThick } from 'react-icons/ti';
import { getImages } from '../reducers/imageReducer';
import { ColorRing } from 'react-loader-spinner';
import { filterChange } from '../reducers/filterReducer';
import CommentSort from './CommentSort';
import { totalPages } from '../reducers/pageReducer';
import Pager from './Pager';
import { resetQuery } from '../reducers/queryReducer';

const ThreadList = () => {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.thread.threads);
  const loading = useSelector((state) => state.thread.loading);
  const user = useSelector((state) => state.login.user);
  const comments = useSelector((state) => state.thread.comments);
  const images = useSelector((state) => state.images);
  const page = useSelector((state) => state.page.number);

  const sorted = useSelector((state) => {
    if (state.filter === 'NEW') {
      return [...threads].sort((a, b) => b.created - a.created);
    }
    if (state.filter === 'TOP') {
      return [...threads].sort((a, b) => b.likes - a.likes);
    }
    return [...threads].sort((a, b) => a.created - b.created);
  });

  useEffect(() => {
    dispatch(getThreads(page));
    dispatch(getUsers());
    dispatch(getComments());
    dispatch(getImages());
    dispatch(filterChange(''));
    dispatch(totalPages());
    dispatch(resetQuery());
  }, [dispatch, page]);

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

    dispatch(downVote(post));
  };

  if (loading || !images)
    return (
      <div className="flex justify-center">
        <ColorRing colors={['#f4f4f5', '#f4f4f5', '#f4f4f5', '#f4f4f5', '#f4f4f5']} />
      </div>
    );

  if (!user)
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-8">
          {sorted.map((post) => {
            const numberOfComments = comments.filter((c) => c.thread === post.id);
            const image = images.find((image) => image.threadId === post.id);
            return (
              <div
                className="md:col-start-2 md:col-span-6 flex items-center gap-2 md:bg-zinc-200 md:text-zinc-800 p-2 text-sm border-b border-zinc-500"
                key={post.id}
              >
                <div className="flex flex-col items-center">
                  <TiArrowUpThick className="w-6 h-6" />
                  <span className="font-bold">{post.likes}</span>
                  <TiArrowDownThick className="w-6 h-6" />
                </div>
                <Link to={`/posts/${post.id}`} className="grow">
                  <div className="grid grid-cols-3 gap-y-2">
                    <h1 className="font-bold text-base col-span-3">{post.title}</h1>
                    <div className="col-start-1 col-span-2 flex flex-col justify-between">
                      <div className="truncate">{post.content}</div>
                      <div className="text-xs mt-2">{numberOfComments.length} comments</div>
                    </div>
                    {image && (
                      <img
                        src={image.url}
                        className="rounded col-start-3 place-self-end md:h-36"
                        alt="alt"
                      />
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <Pager />
      </div>
    );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-8">
        {user && (
          <div className="flex justify-center md:justify-start md:col-start-2 gap-2 md:col-span-4 text-sm mb-2">
            <ThreadForm />
            <CommentSort />
          </div>
        )}
        {sorted.map((post) => {
          const numberOfComments = comments.filter((c) => c.thread === post.id);
          const image = images.find((image) => image.threadId === post.id);
          return (
            <div
              className="md:col-start-2 md:col-span-6 flex items-center gap-2 md:bg-zinc-200 md:text-zinc-800 p-2 text-sm border-b border-zinc-500"
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
                <div className="grid grid-cols-3 gap-y-2">
                  <h1 className="font-bold text-base col-span-3">{post.title}</h1>
                  <div className="col-start-1 col-span-2 flex flex-col justify-between">
                    <div className="truncate">{post.content}</div>
                    <div className="text-xs mt-2">{numberOfComments.length} comments</div>
                  </div>
                  {image && (
                    <img
                      src={image.url}
                      className="rounded col-start-3 place-self-end md:h-36"
                      alt={image.filename}
                    />
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <Pager />
    </div>
  );
};

export default ThreadList;
