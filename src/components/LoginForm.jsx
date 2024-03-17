import { useState } from 'react';
import loginService from '../services/login';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/loginReducer';
import threadService from '../services/threads';

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
      threadService.setToken(user.token);
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
