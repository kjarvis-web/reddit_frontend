/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getThreads, updateComment, updatePost } from '../reducers/threadReducer';
import Modal from './Modal';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const EditCommentForm = ({ comment, setIsOpen }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const user = useSelector((state) => state.login.user);
  const ref = useRef();
  const comments = useSelector((state) => state.thread.comments);
  const findComment = comments.find((c) => c.id === comment.id);
  useEffect(() => {
    dispatch(getThreads());
    setContent(findComment.text);
  }, [dispatch, findComment.text]);

  const handleEdit = (e) => {
    e.preventDefault();
    const newComment = {
      text: content,
      id: comment.id,
      edited: true,
    };
    dispatch(updateComment(newComment));
    setContent('');
    ref.current.toggleModal();
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <Modal ref={ref} buttonLabel="EDIT" h2="Edit...">
      <form onSubmit={handleEdit} className="flex flex-col mt-4 text-zinc-800">
        <textarea
          className="text-zinc-900 rounded focus:outline-none text-sm h-36 p-1"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type here..."
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-zinc-100 p-2 rounded mt-2"
          type="submit"
        >
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default EditCommentForm;
