import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/loginReducer';

const Navbar = () => {
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 p-2 bg-zinc-800 text-zinc-100">
      <div className="flex flex-row justify-around items-center">
        <Link to="/">
          <div className="text-5xl font-bold text-orange-700">reddit</div>
        </Link>
        {!user ? (
          <LoginForm />
        ) : (
          <div className="flex flex-row gap-2 items-center">
            <div className="font-bold">logged in as {user.username}</div>
            <button
              className="bg-orange-600 hover:bg-orange-700 font-bold py-2 px-4 rounded-full"
              onClick={() => dispatch(logout())}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
