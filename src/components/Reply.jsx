/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import Timestamp from './Timestamp';
import ModalReply from './ModalReply';

const Reply = ({ replyId, handleReply }) => {
  const comments = useSelector((state) => state.thread.comments);
  const nestedComments = comments.filter((c) => c.parentId === replyId);

  if (nestedComments.length > 0)
    return nestedComments.map((c) => (
      <div className="mx-4" key={c.id}>
        <Timestamp c={c} />
        <div className="flex justify-between">
          <span>{c.text}</span>
          {/* <button onClick={() => handleReply(c.id)}>REPLY</button> */}
          <ModalReply replyId={c.id} />
        </div>
        {/* <Reply handleReply={handleReply} replyId={c.id} /> */}
        <Reply replyId={c.id} />
      </div>
    ));

  return null;
};
export default Reply;
