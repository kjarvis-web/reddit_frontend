/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { downVoteComment, upVoteComment } from '../reducers/threadReducer';
import { TiArrowUpThick, TiArrowDownThick } from 'react-icons/ti';
import ModalReply from './ModalReply';
import DropdownComment from './DropdownComment';

const VoteReply = ({ comment }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);

  const addLike = (c) => {
    const findDown = c.downVotes.find((userId) => userId === user.id);
    const post = {
      likes: c.likes + 1,
      id: c.id,
      downVotes: findDown ? c.downVotes.filter((userId) => userId !== user.id) : c.downVotes,
      upVotes: !findDown ? c.upVotes.concat(user.id) : c.upVotes,
    };
    dispatch(upVoteComment(post));
  };

  const removeLike = (c) => {
    const findUp = c.upVotes.find((userId) => userId === user.id);
    const post = {
      likes: c.likes - 1,
      id: c.id,
      upVotes: findUp ? c.upVotes.filter((userId) => userId !== user.id) : c.upVotes,
      downVotes: !findUp ? c.downVotes.concat(user.id) : c.downVotes,
    };
    dispatch(downVoteComment(post));
  };

  if (!user || comment.removed === true) {
    return (
      <div className="flex gap-4">
        <div className="flex items-center gap-1">
          <TiArrowUpThick className="w-5 h-5" />
          <span className="text-xs">{comment.likes}</span>
          <TiArrowDownThick className="w-5 h-5" />
        </div>
        <ModalReply replyId={comment.id} />
        {comment.edited && (
          <div className="text-xs text-green-500 flex items-center">this post has been edited</div>
        )}
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-1">
        {user.id === comment.upVotes.find((id) => id === user.id) ? (
          <TiArrowUpThick className="w-5 h-5 text-green-500" />
        ) : (
          <TiArrowUpThick
            className="w-5 h-5 cursor-pointer hover:text-green-500"
            onClick={() => addLike(comment)}
          />
        )}
        <span className="text-xs">{comment.likes}</span>
        {user.id === comment.downVotes.find((id) => id === user.id) ? (
          <TiArrowDownThick className="w-5 h-5 text-orange-700" />
        ) : (
          <TiArrowDownThick
            className="w-5 h-5 cursor-pointer hover:text-orange-700"
            onClick={() => removeLike(comment)}
          />
        )}
      </div>
      <ModalReply replyId={comment.id} />
      {user.id === comment.user.id && <DropdownComment comment={comment} />}
      {comment.edited && (
        <div className="text-xs text-orange-600 flex items-center">this post has been edited</div>
      )}
    </div>
  );
};

export default VoteReply;
