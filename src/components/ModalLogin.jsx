/* eslint-disable react/prop-types */
import { useRef } from 'react';
import LoginForm from './LoginForm';
import Modal from './Modal';

const ModalLogin = (props) => {
  const ref = useRef();
  console.log(ref);
  return (
    <Modal buttonLabel="Login" className={props.className} ref={ref}>
      <LoginForm modalRef={ref} />
    </Modal>
  );
};

export default ModalLogin;
