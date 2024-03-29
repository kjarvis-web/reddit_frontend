import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getComments } from '../reducers/threadReducer';

const Reply = ({ replyId }) => {
  const comments = useSelector((state) => state.thread.comments);
  const nestedComments = comments.filter((c) => c.parentId === replyId);
  console.log('nest', nestedComments);
  console.log('comments', comments);

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
          <button>REPLY</button>
        </div>
        <Reply replyId={c.id} />
      </div>
    ));

  return null;
};
export default Reply;
