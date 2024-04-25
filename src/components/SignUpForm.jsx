import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, setSuccess } from '../reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [success, setSuccess] = useState(false);
  const error = useSelector((state) => state.user.error);
  const success = useSelector((state) => state.user.success);
  console.log(success);

  const handleSignUp = (e) => {
    e.preventDefault();
    const user = {
      username,
      password,
    };
    dispatch(addUser(user));
  };
  
  if (success) {
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }

  if (success)
    return (
      <div className="text-center text-xl font-bold text-zinc-100">
        <p>Success! Your are now being redirected back to the homepage...</p>
      </div>
    );
  return (
    <div className="sign-up flex flex-col gap-4">
      <h1 className="font-bold mb-2 text-zinc-100 text-xl text-center">
        Enter a username and password to create an account.
      </h1>
      {error !== '' && <div className="text-center text-red-500">{error}</div>}
      <form
        onSubmit={handleSignUp}
        className="grid auto-rows-min place-content-center place-items-end gap-2"
      >
        <div className="flex flex-col items-start">
          <input
            className="text-zinc-900 rounded focus:outline-none p-1 text-sm border"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="row-start-2 flex flex-col items-start">
          <input
            className="text-zinc-900 rounded focus:outline-none p-1 text-sm border"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 rounded p-2 text-sm row-start-3 text-zinc-100"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
