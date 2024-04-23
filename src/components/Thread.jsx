import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getComments, getPost, getThreads, resetPost } from '../reducers/threadReducer';
import Reply from './Reply';
import Timestamp from './Timestamp';
import ModalComment from './ModalComment';
import VoteReply from './VoteReply';
import Dropdown from './Dropdown';
import { getImages } from '../reducers/imageReducer';
import Toggle from './Toggle';
import VotePost from './VotePost';
import { ColorRing } from 'react-loader-spinner';
import CommentSort from './CommentSort';

const Thread = () => {
  const comments = useSelector((state) => state.thread.comments);
  const id = useParams().id;
  const dispatch = useDispatch();
  const thread = useSelector((state) => state.thread.post);
  const post = useSelector((state) => state.thread.threads);
  const findPost = post.find((p) => p.id === id);
  const page = useSelector((state) => state.page.number);

  useEffect(() => {
    dispatch(resetPost());
    dispatch(getPost(id));
    dispatch(getComments());
    dispatch(getImages());
    dispatch(getThreads(page));
  }, [dispatch, id, page]);

  const user = useSelector((state) => state.login.user);
  const images = useSelector((state) => state.images);
  const findComments = comments.filter((comment) => comment.parentId === id);
  const sorted = useSelector((state) => {
    if (state.filter === 'NEW') {
      return [...findComments].sort((a, b) => b.created - a.created);
    }
    if (state.filter === 'TOP') {
      return [...findComments].sort((a, b) => b.likes - a.likes);
    }
    return [...findComments].sort((a, b) => a.created - b.created);
  });

  if (!thread || !findPost) {
    return (
      <div className="flex justify-center">
        <ColorRing colors={['#f4f4f5', '#f4f4f5', '#f4f4f5', '#f4f4f5', '#f4f4f5']} />
      </div>
    );
  }

  const image = images.find((image) => image.threadId === thread.id);

  return (
    <div>
      <div className="md:bg-zinc-200 py-4 md:px-8 rounded md:shadow-lg md:border text-sm md:text-base">
        <div className="flex flex-row justify-between">
          <h1 className="px-2 md:px-0 font-bold md:text-3xl text-xl text-zinc-100 md:text-zinc-900">
            {thread.title}
          </h1>
          {user && thread.author === user.id && <Dropdown />}
        </div>
        <div className="text-zinc-100 md:text-zinc-800 px-2 md:px-0">
          <Timestamp c={thread} />
        </div>
        {thread.edited && (
          <div className="ml-4 mt-2 text-xs text-red-700">this post has been edited</div>
        )}
        <div className="my-4 md:ml-0 p-2 md:p-8 md:bg-zinc-300 md:text-zinc-900 md:rounded whitespace-pre-wrap">
          <div>{thread.content}</div>
          {image && (
            <Toggle>
              <img src={image.url} className="rounded cursor-pointer" alt="alt" />
            </Toggle>
          )}
        </div>
        <div className="flex flex-col justify-center items-center md:flex-row md:justify-start gap-4">
          <VotePost thread={findPost} />
          <ModalComment />
          <CommentSort />
        </div>
        {sorted.length === 0 && (
          <div className="text-zinc-100 md:text-zinc-800 mt-2 mr-2">
            Nothing seems to be here yet...
          </div>
        )}
        {sorted.map((c, i) => (
          <div key={i} className="text-zinc-100 text-sm bg-zinc-800 my-2 md:pb-2 rounded">
            <div className="px-2">
              <Timestamp c={c} />
              <div className="whitespace-pre-wrap p-1">{c.text}</div>
              <VoteReply comment={c} />
              {comments.map((reply) => {
                const nestedComments = comments.filter((c) => c.parentId === reply.id);
                console.log(nestedComments);
                return (
                  reply.parentId === c.id && (
                    <div
                      className="flex flex-col mx-2 border-l border-green-600 px-2"
                      key={reply.id}
                    >
                      <Timestamp c={reply} />
                      <div className="whitespace-pre-wrap p-1">{reply.text}</div>
                      <VoteReply comment={reply} />
                      <Reply replyId={reply.id} />
                    </div>
                  )
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thread;
