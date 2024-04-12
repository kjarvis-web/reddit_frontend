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
  const user = useSelector((state) => state.login.user);

  const findComments = comments.filter((comment) => comment.parentId === id);
  const sorted = [...findComments].sort((a, b) => a.created - b.created);

  return threads.length === 0 ? (
    <div>loading...</div>
  ) : (
    <div>
      <div className="md:bg-zinc-200 py-4 px-8 rounded md:shadow-lg md:border text-sm md:text-base">
        <div className="flex flex-row justify-between">
          <h1 className="font-bold md:text-3xl text-xl text-zinc-900">
            {thread.title} posted by {thread.user.username}
          </h1>
          {user && thread.user.id === user.id && <Dropdown />}
        </div>
        {thread.edited && (
          <div className="ml-4 mt-2 text-xs text-orange-700">this post has been edited</div>
        )}
        <div className="my-4 ml-4 p-8 bg-zinc-300 text-zinc-900 rounded whitespace-pre-wrap">
          {thread.content}
        </div>
        <ModalComment />
        {sorted.map((c, i) => (
          <div key={i} className="md:text-zinc-100 text-sm md:bg-zinc-700 my-2 pb-2 rounded">
            <div className="px-2">
              <Timestamp c={c} />
              <div className="whitespace-pre-wrap">{c.text}</div>
              <VoteReply comment={c} />
              {comments.map(
                (reply) =>
                  reply.parentId === c.id && (
                    <div
                      className="flex flex-col mx-2 border-l border-orange-600 px-2"
                      key={reply.id}
                    >
                      <Timestamp c={reply} />
                      <div className="whitespace-pre-wrap">{reply.text}</div>
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
