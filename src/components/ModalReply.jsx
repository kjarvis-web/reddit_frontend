/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReply } from '../reducers/threadReducer';
import Modal from './Modal';
import { useRef } from 'react';
import { TiMessage } from 'react-icons/ti';

const ModalReply = ({ replyId }) => {
  const dispatch = useDispatch();
  const [reply, setReply] = useState('');
  const [visible, setVisible] = useState(false);

  const ref = useRef();

  const handleReply = (e) => {
    e.preventDefault();
    setVisible(!visible);
    dispatch(addReply(replyId, { comment: reply }));
    setReply('');
    ref.current.toggleModal();
  };

  return (
    <Modal
      ref={ref}
      buttonLabel={
        <div className="flex flex-row gap-1">
          <TiMessage className="w-5 h-5" />
          <div>Reply</div>
        </div>
      }
      h2="Replying to..."
    >
      <form onSubmit={handleReply} className="flex flex-col mt-4 text-zinc-800">
        <textarea
          className="text-zinc-900 rounded focus:outline-none text-sm h-36 p-1"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        {/* <button
          // onClick={() => handleReply()}
          type="submit"
        >
          SUBMIT
        </button> */}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-zinc-100 p-2 rounded mt-2"
          type="submit"
        >
          Reply
        </button>
      </form>
    </Modal>
  );
};

export default ModalReply;
