/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { downVoteComment, upVoteComment } from '../reducers/threadReducer';
import { TiArrowUpThick, TiArrowDownThick } from 'react-icons/ti';
import ModalReply from './ModalReply';

const VoteReply = ({ comment }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);

  const addLike = (c) => {
    const comment = {
      likes: c.likes + 1,
      id: c.id,
      downVotes: c.downVotes.find((userId) => userId === user.id)
        ? c.downVotes.filter((userId) => userId !== user.id)
        : c.downVotes,
    };
    dispatch(upVoteComment(comment));
  };

  const removeLike = (c) => {
    const comment = {
      likes: c.likes - 1,
      id: c.id,
      upVotes: c.upVotes.find((userId) => userId === user.id)
        ? c.upVotes.filter((userId) => userId !== user.id)
        : c.upVotes,
    };
    dispatch(downVoteComment(comment));
  };

  if (!user) {
    return (
      <div className="flex gap-4">
        <div className="flex items-center gap-1">
          <TiArrowUpThick className="w-5 h-5" />
          <span className="text-xs">{comment.likes}</span>
          <TiArrowDownThick className="w-5 h-5" />
        </div>
        <ModalReply replyId={comment.id} />
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-1">
        {user.id === comment.upVotes.find((id) => id === user.id) ? (
          <TiArrowUpThick className="w-5 h-5 cursor-pointer hover:text-green-500" />
        ) : (
          <TiArrowUpThick
            className="w-5 h-5 cursor-pointer hover:text-green-500"
            onClick={() => addLike(comment)}
          />
        )}
        <span className="text-xs">{comment.likes}</span>
        {user.id === comment.downVotes.find((id) => id === user.id) ? (
          <TiArrowDownThick className="w-5 h-5 cursor-pointer hover:text-red-500" />
        ) : (
          <TiArrowDownThick
            className="w-5 h-5 cursor-pointer hover:text-red-500"
            onClick={() => removeLike(comment)}
          />
        )}
      </div>
      <ModalReply replyId={comment.id} />
    </div>
  );
};

export default VoteReply;
