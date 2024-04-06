/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import Timestamp from './Timestamp';
import ModalReply from './ModalReply';
import { TiArrowUpThick, TiArrowDownThick } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { downVoteComment, upVoteComment } from '../reducers/threadReducer';
import VoteReply from './VoteReply';

const Reply = ({ replyId }) => {
  const comments = useSelector((state) => state.thread.comments);
  const nestedComments = comments.filter((c) => c.parentId === replyId);

  if (nestedComments.length > 0)
    return nestedComments.map((c) => (
      <div className="mx-2" key={c.id}>
        <Timestamp c={c} />
        <div className="flex justify-between">{c.text}</div>
        <VoteReply comment={c} />
        <Reply replyId={c.id} />
      </div>
    ));

  return null;
};
export default Reply;
