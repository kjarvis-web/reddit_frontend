import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/loginReducer';
import ModalLogin from './ModalLogin';
import { TiUserOutline } from 'react-icons/ti';
import { TbLogout2 } from 'react-icons/tb';
import { useState } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';
import Search from './Search';
import { firstPage } from '../reducers/pageReducer';

const Navbar = () => {
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 p-2 bg-zinc-800 text-zinc-100">
      <div className="flex flex-row justify-between md:justify-around items-center">
        <Link to="/">
          <button
            className="text-5xl font-bold text-orange-600"
            onClick={() => dispatch(firstPage())}
          >
            reddit
          </button>
        </Link>
        <div className="hidden md:block">
          <Search />
        </div>

        <div className="md:hidden">
          {isOpen ? (
            <IoClose onClick={() => setIsOpen(false)} className="w-10 h-10" />
          ) : (
            <IoMenu onClick={() => setIsOpen(true)} className="w-10 h-10" />
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
            <div className="font-bold text-sm flex items-center">
              <TiUserOutline className="h-5 w-5" />
              <Link to={`/users/${user.id}`}>
                <span className="hover:text-orange-600">{user.username}</span>
              </Link>
            </div>
            <button
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-100 hover:text-zinc-800 font-bold py-2 px-2 rounded-full text-sm border border-zinc-100"
              onClick={() => dispatch(logout())}
            >
              <TbLogout2 className="h-5 w-5" />
              Log Out
            </button>
          </div>
        )}
      </div>
      {isOpen && user ? (
        <ul className="flex flex-col items-start md:hidden gap-4">
          <li className="mt-4">
            <Search />
          </li>
          <li className="flex gap-2 items-center">
            <TiUserOutline className="h-5 w-5" />
            <Link to={`/users/${user.id}`}>
              <span className="hover:text-orange-600 font-bold">{user.username}</span>
            </Link>
          </li>
          <li>
            <button
              className="font-bold flex items-center gap-2"
              onClick={() => dispatch(logout())}
            >
              <TbLogout2 className="h-5 w-5" />
              Log Out
            </button>
          </li>
        </ul>
      ) : null}
      {isOpen && !user ? (
        <ul className="flex flex-col items-center gap-4 p-4 md:hidden">
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
