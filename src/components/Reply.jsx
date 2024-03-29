import { useSelector } from 'react-redux';

const Reply = ({ replyId }) => {
  const comments = useSelector((state) => state.thread.comments);
  const nestedComments = comments.filter((c) => c.parentId === replyId);
  console.log('nest', nestedComments);
  console.log('comments', comments);

  if (nestedComments.length > 0)
    return nestedComments.map((c) => (
      <div key={c.id}>
        {c.text} <Reply replyId={c.id} />
      </div>
    ));

  return null;
};
export default Reply;
