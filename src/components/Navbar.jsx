import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/loginReducer';
import ModalLogin from './ModalLogin';
import { TiThMenu, TiTimes } from 'react-icons/ti';
import { useState } from 'react';

const Navbar = () => {
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 p-2 bg-zinc-800 text-zinc-100">
      <div className="flex flex-row justify-around items-center">
        <Link to="/">
          <div className="text-5xl font-bold text-orange-700">reddit</div>
        </Link>
        <div className="md:hidden">
          {isOpen ? (
            <TiTimes onClick={() => setIsOpen(false)} className="w-10 h-10" />
          ) : (
            <TiThMenu onClick={() => setIsOpen(true)} className="w-10 h-10" />
          )}
        </div>
        {!user ? (
          <div className="hidden md:flex flex-row gap-4">
            <ModalLogin className="bg-orange-600 hover:bg-orange-700 font-bold py-2 px-4 rounded-full text-sm" />
            <Link to="/signup">
              <button className="bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded-full text-sm">
                Create Account
              </button>
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex flex-row gap-6 items-center">
            <div className="font-bold text-sm">
              <span>logged in as </span>
              <Link to={`/users/${user.id}`}>
                <span className="hover:text-orange-600">{user.username}</span>
              </Link>
            </div>
            <button
              className="bg-orange-600 hover:bg-orange-700 font-bold py-2 px-4 rounded-full text-sm"
              onClick={() => dispatch(logout())}
            >
              Log out
            </button>
          </div>
        )}
      </div>
      {isOpen && user ? (
        <ul className="flex flex-col items-center gap-2">
          <li>
            <span>logged in as </span>
            <Link to={`/users/${user.id}`}>
              <span className="hover:text-orange-600">{user.username}</span>
            </Link>
          </li>
          <li>
            <button
              className="bg-orange-600 hover:bg-orange-700 font-bold py-2 px-4 rounded-full text-sm"
              onClick={() => dispatch(logout())}
            >
              Log out
            </button>
          </li>
        </ul>
      ) : null}
      {isOpen && !user ? (
        <ul className="flex flex-col items-center gap-4 p-4">
          <li>
            <ModalLogin className="font-bold text-sm" />
          </li>
          <li>
            <Link to="/signup">
              <button className="font-bold text-sm">Create Account</button>
            </Link>
          </li>
        </ul>
      ) : null}
    </nav>
  );
};

export default Navbar;
