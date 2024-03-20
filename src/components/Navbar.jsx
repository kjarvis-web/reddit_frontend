import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = useSelector((state) => state.login.user);
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-zinc-900 text-zinc-100 ">
      <div className="flex justify-between items-center">
        <Link to="/">
          <div className="text-3xl font-bold">Reddit</div>
        </Link>
        {!user ? <LoginForm /> : <div>logged in as {user.username} </div>}
      </div>
    </nav>
  );
};

export default Navbar;
