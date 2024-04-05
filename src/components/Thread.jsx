import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { downVoteComment, getComments, getThreads, upVoteComment } from '../reducers/threadReducer';
import { TiArrowUpThick, TiArrowDownThick } from 'react-icons/ti';

import Reply from './Reply';
import Timestamp from './Timestamp';
import ModalComment from './ModalComment';
import ModalReply from './ModalReply';

const Thread = () => {
  const threads = useSelector((state) => state.thread.threads);
  const comments = useSelector((state) => state.thread.comments);
  const user = useSelector((state) => state.login.user);
  const id = useParams().id;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('thread use effect');
    dispatch(getThreads());
    dispatch(getComments());
  }, [dispatch]);

  const thread = threads.find((t) => t.id === id);

  const addLike = (c) => {
    const comment = {
      likes: c.likes + 1,
      id: c.id,
      downVotes: c.downVotes.find((userId) => userId === user.id)
        ? c.downVotes.filter((userId) => userId !== user.id)
        : c.downVotes,
    };
    dispatch(upVoteComment(comment));
  };

  const removeLike = (c) => {
    const comment = {
      likes: c.likes - 1,
      id: c.id,
      upVotes: c.upVotes.find((userId) => userId === user.id)
        ? c.upVotes.filter((userId) => userId !== user.id)
        : c.upVotes,
    };
    dispatch(downVoteComment(comment));
  };

  const findComments = comments.filter((comment) => comment.parentId === id);
  const sorted = [...findComments].sort((a, b) => a.created - b.created);

  if (!user)
    return threads.length === 0 ? (
      <div>loading...</div>
    ) : (
      <div>
        <div className="bg-zinc-800 p-4 rounded">
          <h1 className="font-bold text-3xl">
            {thread.title} posted by {thread.user.name}
          </h1>
          <div className="mb-2 ml-4 p-4 bg-zinc-400 text-zinc-900">{thread.content}</div>
          <ModalComment />
          {sorted.map((c, i) => (
            <div key={i} className="flex text-sm bg-zinc-700 rounded mb-2 px-2">
              <div>
                <Timestamp c={c} />
                <div className="flex justify-between">{c.text}</div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <TiArrowUpThick className="w-5 h-5" />
                    <span className="text-xs">{c.likes}</span>
                    <TiArrowDownThick className="w-5 h-5" />
                  </div>
                  <ModalReply replyId={c.id} />
                </div>
                {sorted.map((reply) => {
                  // const sorted = [...comments].sort((a, b) => a.created - b.created);
                  reply.parentId === c.id && (
                    <div className="flex flex-col mx-2" key={reply.id}>
                      <Timestamp c={c} />
                      <div className="flex justify-between items-center">
                        <span>{reply.text}</span>
                        <ModalReply replyId={reply.id} />
                      </div>

                      <Reply replyId={reply.id} />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  return threads.length === 0 ? (
    <div>loading...</div>
  ) : (
    <div>
      <div className="bg-zinc-800 p-4 rounded">
        <h1 className="font-bold text-3xl">
          {thread.title} posted by {thread.user.name}
        </h1>
        <div className="mb-2 ml-4 p-4 bg-zinc-400 text-zinc-900">{thread.content}</div>
        <ModalComment />
        {sorted.map((c, i) => (
          <div key={i} className="flex text-sm bg-zinc-700 rounded mb-2 px-2">
            <div>
              <Timestamp c={c} />
              <div className="flex justify-between">{c.text}</div>
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  {user.id === c.upVotes.find((id) => id === user.id) ? (
                    <TiArrowUpThick className="w-5 h-5 cursor-pointer hover:text-green-500" />
                  ) : (
                    <TiArrowUpThick
                      className="w-5 h-5 cursor-pointer hover:text-green-500"
                      onClick={() => addLike(c)}
                    />
                  )}
                  <span className="text-xs">{c.likes}</span>
                  {user.id === c.downVotes.find((id) => id === user.id) ? (
                    <TiArrowDownThick className="w-5 h-5 cursor-pointer hover:text-red-500" />
                  ) : (
                    <TiArrowDownThick
                      className="w-5 h-5 cursor-pointer hover:text-red-500"
                      onClick={() => removeLike(c)}
                    />
                  )}
                </div>
                <ModalReply replyId={c.id} />
              </div>
              {comments.map(
                (reply) =>
                  reply.parentId === c.id && (
                    <div className="flex flex-col mx-2" key={reply.id}>
                      <Timestamp c={reply} />
                      <div className="flex justify-between">{reply.text}</div>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-1">
                          {user.id === reply.upVotes.find((id) => id === user.id) ? (
                            <TiArrowUpThick className="w-5 h-5 cursor-pointer hover:text-green-500" />
                          ) : (
                            <TiArrowUpThick
                              className="w-5 h-5 cursor-pointer hover:text-green-500"
                              onClick={() => addLike(reply)}
                            />
                          )}
                          <span className="text-xs">{reply.likes}</span>
                          {user.id === reply.downVotes.find((id) => id === user.id) ? (
                            <TiArrowDownThick className="w-5 h-5 cursor-pointer hover:text-red-500" />
                          ) : (
                            <TiArrowDownThick
                              className="w-5 h-5 cursor-pointer hover:text-red-500"
                              onClick={() => removeLike(reply)}
                            />
                          )}
                        </div>
                        <ModalReply replyId={c.id} />
                      </div>
                      <Reply replyId={reply.id} />
                    </div>
                  )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thread;
