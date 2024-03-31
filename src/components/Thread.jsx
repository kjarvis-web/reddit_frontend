import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getComments, getThreads } from '../reducers/threadReducer';

import Reply from './Reply';
import Timestamp from './Timestamp';
import ModalComment from './ModalComment';
import ModalReply from './ModalReply';

const Thread = () => {
  const threads = useSelector((state) => state.thread.threads);
  const comments = useSelector((state) => state.thread.comments);
  const id = useParams().id;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('thread use effect');
    dispatch(getThreads());
    dispatch(getComments());
  }, [dispatch]);

  const thread = threads.find((t) => t.id === id);

  return threads.length === 0 ? (
    <div>loading...</div>
  ) : (
    <div>
      <div className="mt-24 bg-zinc-800 p-4">
        <h1 className="font-bold text-3xl">
          {thread.title} posted by {thread.user.name}
        </h1>
        <div className="mb-2 ml-4 p-4 bg-zinc-400 text-zinc-900">{thread.content}</div>
        <ModalComment />
        {thread.comments.map((c, i) => (
          <div key={i} className="flex flex-col text-sm">
            <Timestamp c={c} />
            <div className="flex justify-between items-center">
              {c.text}
              <ModalReply replyId={c.id} />
            </div>
            {comments.map(
              (reply) =>
                reply.parentId === c.id && (
                  <div className="flex flex-col mx-2" key={reply.id}>
                    <Timestamp c={c} />
                    <div className="flex justify-between">
                      <span>{reply.text}</span>
                      <ModalReply replyId={reply.id} />
                    </div>
                    <Reply replyId={reply.id} />
                  </div>
                )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thread;
