import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReply } from '../reducers/threadReducer';
import Modal from './Modal';
import { useRef } from 'react';

const ModalReply = ({ replyId }) => {
  const dispatch = useDispatch();
  const [reply, setReply] = useState('');
  const [visible, setVisible] = useState(false);

  const ref = useRef();

  const handleReply = () => {
    setVisible(!visible);
    dispatch(addReply(replyId, { comment: reply }));
    setReply('');
    ref.current.toggleModal();
  };

  return (
    <Modal ref={ref} className="bg-green-500 text-zinc-900" buttonLabel="REPLY">
      <div>
        <input className="text-black" value={reply} onChange={(e) => setReply(e.target.value)} />
        <button onClick={() => handleReply()}>SUBMIT</button>
      </div>
    </Modal>
  );
};

export default ModalReply;
