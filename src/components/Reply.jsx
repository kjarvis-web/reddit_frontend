/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import Timestamp from './Timestamp';
import VoteReply from './VoteReply';

const Reply = ({ replyId }) => {
  const comments = useSelector((state) => state.thread.comments);
  const nestedComments = comments.filter((c) => c.parentId === replyId);

  if (nestedComments.length > 0)
    return nestedComments.map((c) => (
      <div className="mx-2 border-l border-green-600 px-2" key={c.id}>
        <Timestamp c={c} />
        <div className="whitespace-pre-wrap">{c.text}</div>
        <VoteReply comment={c} />
        <Reply replyId={c.id} />
      </div>
    ));

  return null;
};
export default Reply;
