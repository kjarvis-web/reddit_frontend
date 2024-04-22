/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPost, getThreads, updatePost } from '../reducers/threadReducer';
import Modal from './Modal';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const EditForm = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const user = useSelector((state) => state.login.user);
  const id = useParams().id;
  const ref = useRef();

  const post = useSelector((state) => state.thread.post);

  useEffect(() => {
    dispatch(getPost(id));
    setContent(post.content);
  }, [dispatch, post.content, id]);

  const handleEdit = (e) => {
    e.preventDefault();
    const editedPost = {
      content,
      edited: true,
      user,
      id,
    };
    dispatch(updatePost(editedPost));
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
          className="bg-blue-600 hover:bg-blue-700 text-zinc-100 p-2 rounded mt-2 md:w-1/4"
          type="submit"
        >
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default EditForm;
