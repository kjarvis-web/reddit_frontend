import { useState } from 'react';
import threadService from '../services/threads';

const ThreadForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newThread = {
      title,
      content,
    };
    threadService.create(newThread);
    setTitle('');
    setContent('');
  };

  return (
    <form className="flex flex-col text-zinc-900" onSubmit={handleSubmit}>
      <label>Title: </label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Content: </label>
      <input value={content} onChange={(e) => setContent(e.target.value)} />
      <button className="bg-green-600" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ThreadForm;
