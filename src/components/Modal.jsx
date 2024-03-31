import { useState } from 'react';
import { addComment } from '../reducers/threadReducer';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState('');

  const id = useParams().id;
  const dispatch = useDispatch();

  const handleComment = (comment) => {
    dispatch(addComment(id, comment));
    setComment('');
    setIsOpen(!isOpen);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded mb-2"
      >
        Add Comment {'\u2295'}
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-zinc-800 p-8 rounded w-2/3 h-1/4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-zinc-200">Replying to...</h2>
              <button onClick={toggleModal} className="text-zinc-700 hover:text-gray-200 text-3xl">
                {'\u00D7'}
              </button>
            </div>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
