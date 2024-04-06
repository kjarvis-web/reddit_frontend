import LoginForm from './LoginForm';
import Modal from './Modal';

const ModalLogin = () => {
  return (
    <Modal
      buttonLabel="Login"
      className="bg-orange-600 hover:bg-orange-700 font-bold py-2 px-4 rounded-full"
      h2="Login"
    >
      <LoginForm />
    </Modal>
  );
};

export default ModalLogin;
