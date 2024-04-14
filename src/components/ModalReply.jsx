/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReply } from '../reducers/threadReducer';
import Modal from './Modal';
import { useRef } from 'react';
import ReplyLabel from './ReplyLabel';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import { useParams } from 'react-router-dom';

const ModalReply = ({ replyId }) => {
  const dispatch = useDispatch();
  const [reply, setReply] = useState('');
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.login.user);
  const id = useParams().id;
  const comments = useSelector((state) => state.thread.comments);
  const findAuthor = comments.find((c) => c.id === replyId);

  const ref = useRef();

  const handleReply = (e) => {
    e.preventDefault();
    setVisible(!visible);
    dispatch(addReply(replyId, { comment: reply, thread: id }));
    setReply('');
    ref.current.toggleModal();
  };

  if (!user)
    return (
      <Modal ref={ref} buttonLabel={<ReplyLabel />}>
        <LoginForm />
      </Modal>
    );

  return (
    <Modal
      ref={ref}
      buttonLabel={<ReplyLabel />}
      h2={`Replying to ${findAuthor.user.username}`}
      className="flex items-center"
    >
      <p className="text-zinc-100">{findAuthor.text}</p>
      <form onSubmit={handleReply} className="flex flex-col mt-2 text-zinc-800">
        <textarea
          className="text-zinc-900 rounded focus:outline-none text-sm w-full p-1"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Type here..."
          rows={10}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-zinc-100 p-2 rounded mt-2 w-full md:w-1/4"
          type="submit"
        >
          Reply
        </button>
      </form>
    </Modal>
  );
};

export default ModalReply;
