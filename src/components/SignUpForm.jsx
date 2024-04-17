import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../reducers/userReducer';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleSignUp = () => {
    const user = {
      username,
      password,
    };
    dispatch(addUser(user));
    setSuccess(true);
    setTimeout(() => {
      navigate('/');
      setSuccess(false);
    }, 3000);
  };
  if (success)
    return (
      <div className="flex justify-center text-xl font-bold text-zinc-100">
        <span>Success! Your are now being redirected back to the homepage...</span>
      </div>
    );
  return (
    <div className="sign-up flex flex-col gap-4">
      <h1 className="font-bold mb-2 text-zinc-100 text-xl text-center">
        Enter a username and password to create an account.
      </h1>
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
