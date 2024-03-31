/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useState } from 'react';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';

const Modal = forwardRef((props, refs) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleModal,
    };
  });

  return (
    <div>
      <button
        onClick={toggleModal}
        className="bg-green-500 hover:bg-green-600 text-zinc-900 font-bold py-2 px-4 rounded mb-2"
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
            <div>{props.children}</div>
          </div>
        </div>
      )}
    </div>
  );
});

export default Modal;
