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
      <div className="ml-4" key={c.id}>
        {c.text} <Reply replyId={c.id} />
      </div>
    ));

  return null;
};
export default Reply;
