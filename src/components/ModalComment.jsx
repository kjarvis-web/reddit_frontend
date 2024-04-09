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

  const handleComment = (e, comment) => {
    e.preventDefault();
    dispatch(addComment(id, comment));
    setComment('');
    //for toggle visibility of comment modal window after submit
    ref.current.toggleModal();
  };
  if (!user) return null;
  return (
    <Modal
      ref={ref}
      buttonLabel={`Add Comment \u2295`}
      className="bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded-full mb-2"
      h2={`Replying to...`}
    >
      <form
        className="flex flex-col mt-4 text-zinc-800"
        onSubmit={(e) => handleComment(e, { comment })}
      >
        <textarea
          className="text-zinc-900 rounded focus:outline-none text-sm h-36 p-1"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment here..."
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-zinc-100 p-2 rounded mt-2 text-sm"
          type="submit"
        >
          Reply
        </button>
      </form>
    </Modal>
  );
};

export default ModalComment;
