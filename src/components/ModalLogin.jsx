import { useRef } from 'react';
import LoginForm from './LoginForm';
import Modal from './Modal';

const ModalLogin = () => {
  const ref = useRef();
  console.log(ref);
  return (
    <Modal
      buttonLabel="Login"
      className="bg-orange-600 hover:bg-orange-700 font-bold py-2 px-4 rounded-full text-sm"
      ref={ref}
    >
      <LoginForm modalRef={ref} />
    </Modal>
  );
};

export default ModalLogin;
