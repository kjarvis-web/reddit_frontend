import { useState } from 'react';
import loginService from '../services/login';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../reducers/loginReducer';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      dispatch(setUser(user));
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <form onSubmit={handleLogin} className="text-black">
      <label>Username: </label>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <label>Password: </label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
