/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getComments } from '../reducers/threadReducer';

const Reply = ({ replyId, handleReply }) => {
  const comments = useSelector((state) => state.thread.comments);
  const nestedComments = comments.filter((c) => c.parentId === replyId);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('use effect');
    dispatch(getComments());
  }, [dispatch]);

  if (nestedComments.length > 0)
    return nestedComments.map((c) => (
      <div className="mx-4" key={c.id}>
        <div className="flex justify-between">
          <span>{c.text}</span>
          <button onClick={() => handleReply(replyId)}>REPLY</button>
        </div>
        <Reply handleReply={handleReply} replyId={c.id} />
      </div>
    ));

  return null;
};
export default Reply;
