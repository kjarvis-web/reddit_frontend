/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addComment } from '../reducers/threadReducer';
import { useRef } from 'react';
import Modal from './Modal';
import { useSelector } from 'react-redux';

const ModalComment = () => {
  const [comment, setComment] = useState('');

  const id = useParams().id;
  const dispatch = useDispatch();
  const ref = useRef();
  const user = useSelector((state) => state.login.user);

  const handleComment = (e) => {
    e.preventDefault();
    const newComment = {
      comment,
      thread: id,
      author: user.id,
    };
    console.log(newComment);
    dispatch(addComment(id, newComment));
    setComment('');
    //for toggle visibility of comment modal window after submit
    ref.current.toggleModal();
  };
  if (!user) return null;
  return (
    <Modal
      ref={ref}
      buttonLabel={`Add Comment \u2295`}
      className="bg-zinc-200 hover:bg-zinc-100 font-bold py-2 px-4 rounded-full mb-2 text-zinc-800 border-zinc-900 border"
      h2={`Post a comment`}
    >
      <form className="flex flex-col mt-4 text-zinc-800" onSubmit={handleComment}>
        <textarea
          className="text-zinc-900 rounded focus:outline-none text-sm p-1"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment here..."
          rows={10}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-zinc-100 p-2 rounded mt-2 text-sm md:w-1/4"
          type="submit"
        >
          Reply
        </button>
      </form>
    </Modal>
  );
};

export default ModalComment;
