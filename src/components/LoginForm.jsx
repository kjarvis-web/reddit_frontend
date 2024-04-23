/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../reducers/loginReducer';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';

const LoginForm = ({ modalRef }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.login.loading);
  const error = useSelector((state) => state.login.error);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
    setUsername('');
    setPassword('');
  };

  const handleSignUp = () => {
    modalRef.current.toggleModal();
    navigate('/signup');
  };

  if (loading && !error)
    return (
      <div className="flex flex-col justify-center items-center">
        <p>Logging you in...</p>
        <ColorRing colors={['#f4f4f5', '#f4f4f5', '#f4f4f5', '#f4f4f5', '#f4f4f5']} />
      </div>
    );

  return (
    <div className="login">
      <form
        onSubmit={handleLogin}
        className="grid auto-rows-min place-content-center place-items-end gap-2"
      >
        <div className="flex flex-col items-start">
          <h1 className="font-bold text-xl mb-2">Login</h1>
          <input
            className="text-zinc-900 rounded focus:outline-none p-1 text-sm"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="row-start-2 flex flex-col items-start">
          <input
            className="text-zinc-900 rounded focus:outline-none p-1 text-sm"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 rounded p-2 text-sm row-start-3 mb-2"
        >
          Sign In
        </button>
        {error && <div className="text-red-500">wrong username or password</div>}
      </form>
      <hr className="my-2" />
      <div className="flex justify-center">
        <div>
          No account?{' '}
          <span to="/signup" className="cursor-pointer hover:text-blue-500" onClick={handleSignUp}>
            Click here to sign up.
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
