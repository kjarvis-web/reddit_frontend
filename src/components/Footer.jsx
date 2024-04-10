import { VscGithub } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="flex justify-center items-center p-2 bg-zinc-800 mt-8">
      <Link className="flex items-center gap-2 group" to="https://github.com/norristown">
        <p>Kevin Jarvis</p>
        <VscGithub className="h-10 w-10 group-hover:text-orange-700" />
      </Link>
    </footer>
  );
};

export default Footer;
