/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { TiArrowUpThick, TiArrowDownThick } from 'react-icons/ti';
import { downVote, upVote } from '../reducers/threadReducer';
import { useSelector } from 'react-redux';

const VotePost = ({ thread }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);

  const addLike = () => {
    const findDown = thread.downVotes.find((userId) => userId === user.id);

    const post = {
      likes: thread.likes + 1,
      id: thread.id,
      downVotes: findDown
        ? thread.downVotes.filter((userId) => userId !== user.id)
        : thread.downVotes,
      upVotes: !findDown ? thread.upVotes.concat(user.id) : thread.upVotes,
      author: thread.author,
    };

    dispatch(upVote(post));
  };

  const removeLike = () => {
    const findUp = thread.upVotes.find((userId) => userId === user.id);

    const post = {
      likes: thread.likes - 1,
      id: thread.id,
      upVotes: findUp ? thread.upVotes.filter((userId) => userId !== user.id) : thread.upVotes,
      downVotes: !findUp ? thread.downVotes.concat(user.id) : thread.downVotes,
      author: thread.author,
    };

    dispatch(downVote(post));
  };

  if (!user || thread.removed === true) {
    return (
      <div className="flex gap-4">
        <div className="flex items-center gap-1">
          <TiArrowUpThick className="w-10 h-10" />
          <span className="text-base font-bold">{thread.likes}</span>
          <TiArrowDownThick className="w-10 h-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-1 bg-zinc-800 rounded-full text-zinc-100 border border-zinc-800">
        {user.id === thread.upVotes.find((id) => id === user.id) ? (
          <TiArrowUpThick className="w-10 h-10 text-green-500" />
        ) : (
          <TiArrowUpThick
            className="w-10 h-10 cursor-pointer hover:text-green-500"
            onClick={addLike}
          />
        )}
        <span className="text-base font-bold">{thread.likes}</span>
        {user.id === thread.downVotes.find((id) => id === user.id) ? (
          <TiArrowDownThick className="w-10 h-10 text-orange-600" />
        ) : (
          <TiArrowDownThick
            className="w-10 h-10 cursor-pointer hover:text-orange-600"
            onClick={removeLike}
          />
        )}
      </div>
    </div>
  );
};

export default VotePost;
