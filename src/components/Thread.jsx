import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addReply, getComments, getThreads } from '../reducers/threadReducer';
import { useState } from 'react';
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

  const [reply, setReply] = useState('');
  const [visible, setVisible] = useState(false);
  const [replyId, setReplyId] = useState('');

  const handleReply = () => {
    setVisible(!visible);
    dispatch(addReply(replyId, { comment: reply }));
    setReply('');
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
      <div className="mt-24 bg-zinc-800 p-4">
        <h1 className="font-bold text-3xl">
          {thread.title} posted by {thread.user.name}
        </h1>
        <div className="mb-2 ml-4 p-4 bg-zinc-400 text-zinc-900">{thread.content}</div>
        <ModalComment />
        <div style={hide}>
          <input className="text-black" value={reply} onChange={(e) => setReply(e.target.value)} />
          <button onClick={() => handleReply()}>SUBMIT</button>
        </div>
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
                  <div className="flex flex-col ml-4" key={reply.id}>
                    <Timestamp c={c} />
                    <div className="flex justify-between">
                      <span>{reply.text}</span>
                      <ModalReply replyId={reply.id} />
                    </div>
                    {/* <Reply handleReply={getId} replyId={reply.id} /> */}
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
