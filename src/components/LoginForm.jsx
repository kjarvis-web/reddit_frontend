import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../reducers/loginReducer';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.login.loading);
  const error = useSelector((state) => state.login.error);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
    setUsername('');
    setPassword('');
  };

  if (loading && !error) return <div>logging you in...</div>;

  return (
    <form onSubmit={handleLogin} className="flex flex-col">
      {error && <div className="text-red-500">wrong username or password</div>}
      <label>Username: </label>
      <input
        className="text-black"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Password: </label>
      <input
        className="text-black"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="bg-green-600">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
