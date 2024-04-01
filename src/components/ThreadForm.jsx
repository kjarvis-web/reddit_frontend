import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createThread } from '../reducers/threadReducer';
import Modal from './Modal';
import { useRef } from 'react';

const ThreadForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const ref = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newThread = {
      title,
      content,
    };
    dispatch(createThread(newThread));
    setTitle('');
    setContent('');
    ref.current.toggleModal();
  };

  return (
    <Modal
      ref={ref}
      buttonLabel={`Post Thread \u2295`}
      className="bg-green-500 hover:bg-green-600 text-zinc-900 font-bold py-2 px-4 rounded mb-2"
    >
      <form className="flex flex-col text-zinc-900" onSubmit={handleSubmit}>
        <label>Title: </label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <label>Content: </label>
        <input value={content} onChange={(e) => setContent(e.target.value)} />
        <button className="bg-green-600" type="submit">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default ThreadForm;
