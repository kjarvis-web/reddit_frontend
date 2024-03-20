import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/loginReducer';

const Navbar = () => {
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-zinc-800 text-zinc-100">
      <div className="flex justify-around items-center">
        <Link to="/">
          <div className="text-3xl font-bold">Reddit</div>
        </Link>
        {!user ? (
          <LoginForm />
        ) : (
          <div>
            <div>logged in as {user.username}</div>
            <button onClick={() => dispatch(logout())}>Log out</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
