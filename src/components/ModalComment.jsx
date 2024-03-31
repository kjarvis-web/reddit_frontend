/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addComment } from '../reducers/threadReducer';
import { useRef } from 'react';
import Modal from './Modal';

const ModalComment = () => {
  const [comment, setComment] = useState('');

  const id = useParams().id;
  const dispatch = useDispatch();
  const commentFormRef = useRef();

  const handleComment = (comment) => {
    dispatch(addComment(id, comment));
    setComment('');
    //for toggle visibility of comment modal window after submit
    commentFormRef.current.toggleModal();
  };
  return (
    <Modal ref={commentFormRef}>
      <div className="mt-4 text-zinc-800">
        <textarea
          className="text-zinc-800 mt-4 w-full h-28"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type your comment here..."
        />
        <button
          className="bg-blue-600 text-zinc-100 p-2 rounded float-right"
          onClick={() => handleComment({ comment })}
        >
          Reply
        </button>
      </div>
    </Modal>
  );
};

export default ModalComment;
