import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addComment, getThreads } from '../reducers/threadReducer';
import { useState } from 'react';

const Thread = () => {
  const threads = useSelector((state) => state.thread.threads);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getThreads());
  }, [dispatch]);

  const id = useParams().id;
  console.log(id);

  const thread = threads.find((t) => t.id === id);

  const [comment, setComment] = useState('');

  const handleComment = (comment) => {
    dispatch(addComment(id, comment));
    setComment('');
  };

  return threads.length === 0 ? (
    <div>loading...</div>
  ) : (
    <div>
      <div className="mt-24 bg-zinc-800">
        <h1 className="font-bold text-3xl">{thread.title}</h1>
        <div className=" mb-2">{thread.content}</div>
        {thread.comments.map((c, i) => (
          <div key={i} className="bg-zinc-800 text-zinc-100 mb-2 p-4 text-sm">
            {c.text}
          </div>
        ))}
        <input
          className="text-zinc-800"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button className="bg-blue-600 p-4" onClick={() => handleComment({ comment })}>
        Reply
      </button>
    </div>
  );
};

export default Thread;
