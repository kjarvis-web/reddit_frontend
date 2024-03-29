import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addComment, addReply, getComments, getThreads } from '../reducers/threadReducer';
import { useState } from 'react';
import Reply from './Reply';

const Thread = () => {
  const threads = useSelector((state) => state.thread.threads);
  const comments = useSelector((state) => state.thread.comments);
  const id = useParams().id;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getThreads());
    dispatch(getComments());
  }, [dispatch]);

  const thread = threads.find((t) => t.id === id);

  const [comment, setComment] = useState('');
  const [reply, setReply] = useState('');
  const [visible, setVisible] = useState(false);
  const [replyId, setReplyId] = useState('');

  const handleComment = (comment) => {
    dispatch(addComment(id, comment));
    setComment('');
  };

  const handleReply = () => {
    setVisible(!visible);
    dispatch(addReply(replyId, { comment: reply }));
    console.log({ comment: reply });
    dispatch(getComments());
  };

  const getId = (id) => {
    setReplyId(id);
    setVisible(!visible);
    console.log(id);
  };

  const hide = { display: !visible ? 'none' : '' };

  return threads.length === 0 ? (
    <div>loading...</div>
  ) : (
    <div>
      <div className="mt-24 bg-zinc-800">
        <h1 className="font-bold text-3xl">
          {thread.title} posted by {thread.user.name}
        </h1>
        <div className="mb-2 ml-4 p-4 bg-zinc-400 text-zinc-900">{thread.content}</div>
        <div style={hide}>
          <input className="text-black" value={reply} onChange={(e) => setReply(e.target.value)} />
          <button onClick={() => handleReply()}>submit</button>
        </div>
        {thread.comments.map((c, i) => (
          <div key={i} className="flex flex-col text-sm">
            <div className="font-bold">
              by {c.user.username} at {c.created}
            </div>
            <div className="bg-zinc-700 text-zinc-100 ml-4 flex justify-between items-center">
              {c.text}
              <button className="bg-green-500 text-zinc-900" onClick={() => getId(c.id)}>
                REPLY
              </button>
            </div>

            {c.comments.length > 0 &&
              comments.map(
                (reply) =>
                  reply.parentId === c.id && (
                    <div className={`ml-8 flex flex-col`} key={reply.id}>
                      <div className="flex justify-between">
                        <span>1{reply.text}</span>
                        <button onClick={() => getId(reply.id)}>REPLY</button>
                      </div>
                      <Reply handleReply={getId} replyId={reply.id} />
                    </div>
                  )
              )}
          </div>
        ))}
      </div>
      <input
        className="text-zinc-800 mt-4"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="bg-blue-600" onClick={() => handleComment({ comment })}>
        Reply
      </button>
    </div>
  );
};

export default Thread;
