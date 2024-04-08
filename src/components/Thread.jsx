import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getComments, getThreads } from '../reducers/threadReducer';
import Reply from './Reply';
import Timestamp from './Timestamp';
import ModalComment from './ModalComment';
import VoteReply from './VoteReply';
import Dropdown from './Dropdown';

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

  const findComments = comments.filter((comment) => comment.parentId === id);
  const sorted = [...findComments].sort((a, b) => a.created - b.created);
  console.log(sorted);

  return threads.length === 0 ? (
    <div>loading...</div>
  ) : (
    <div>
      <div className="bg-zinc-800 p-4 rounded">
        <div className="flex flex-row justify-between">
          <h1 className="font-bold text-3xl mb-4">
            {thread.title} posted by {thread.user.username}
          </h1>
          <Dropdown />
        </div>

        <div className="mb-4 ml-4 p-8 bg-zinc-200 text-zinc-900 rounded">{thread.content}</div>
        <ModalComment />
        {sorted.map((c, i) => (
          <div key={i} className="flex text-sm bg-zinc-600 rounded mb-2 px-2">
            <div>
              <Timestamp c={c} />
              <div className="flex justify-between">{c.text}</div>
              <VoteReply comment={c} />
              {comments.map(
                (reply) =>
                  reply.parentId === c.id && (
                    <div className="flex flex-col mx-2" key={reply.id}>
                      <Timestamp c={reply} />
                      <div className="flex justify-between">{reply.text}</div>
                      <VoteReply comment={reply} />
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
