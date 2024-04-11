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
      className="bg-green-500 hover:bg-green-600 text-zinc-900 font-bold py-2 px-4 rounded-full border border-zinc-900 mb-2"
      h2="New Thread"
    >
      <form className="flex flex-col gap-2 mt-4" onSubmit={handleSubmit}>
        {/* <label>Title: </label> */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-zinc-900 rounded focus:outline-none p-1 text-sm"
          placeholder="Title..."
        />
        {/* <label>Content: </label> */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-zinc-900 rounded focus:outline-none text-sm p-1"
          rows={10}
          placeholder="Type here..."
        />
        <button className="bg-green-600 hover:bg-green-700 p-2 rounded text-sm" type="submit">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default ThreadForm;
