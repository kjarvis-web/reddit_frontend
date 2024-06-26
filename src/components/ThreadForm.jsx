import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createThread } from '../reducers/threadReducer';
import Modal from './Modal';
import { useRef } from 'react';
import { getImages } from '../reducers/imageReducer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { lastPage } from '../reducers/pageReducer';
import AddPostLabel from './AddPostLabel';

const ThreadForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const ref = useRef();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    file ? formData.append('file', file) : null;
    formData.append('title', title);
    formData.append('content', content);

    dispatch(createThread(formData))
      .then((data) => {
        if (data) {
          console.log(data);
          dispatch(lastPage());
          navigate(`/posts/${data.id}`);
        }
      })
      .catch((error) => console.log(error));

    setTitle('');
    setContent('');
    setFile(null);
    ref.current.toggleModal();
  };

  useEffect(() => {
    dispatch(getImages());
    // dispatch(getThreads(page));
  }, [dispatch]);

  return (
    <Modal
      ref={ref}
      buttonLabel={<AddPostLabel />}
      className="bg-green-500 hover:bg-green-600 text-zinc-900 font-bold py-2 px-4 rounded-full border border-zinc-900"
      h2="New Thread"
    >
      <form
        className="flex flex-col gap-2 mt-4"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-zinc-900 rounded focus:outline-none p-1 text-sm"
          placeholder="Title..."
          required={true}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-zinc-900 rounded focus:outline-none text-sm p-1"
          rows={10}
          placeholder="Type here..."
        />
        <label className="text-zinc-100">Upload image: </label>
        <input
          type="file"
          accept="image/*"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          className="bg-green-600 hover:bg-green-700 p-2 rounded text-sm text-zinc-100 md:w-1/4"
          type="submit"
        >
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default ThreadForm;
