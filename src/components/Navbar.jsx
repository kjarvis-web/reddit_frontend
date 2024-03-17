import { useSelector } from 'react-redux';

const Navbar = () => {
  const user = useSelector((state) => state);
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-zinc-900 text-zinc-100">
      <div className="flex justify-between items-center">
        <div className="text-3xl font-bold ">Reddit</div>
        <div>Logged in as: {user.username}</div>
      </div>
    </nav>
  );
};

export default Navbar;
