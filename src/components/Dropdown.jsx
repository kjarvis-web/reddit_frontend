import { useState } from 'react';
import { TiEdit } from 'react-icons/ti';
import { TiTimes } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { removePost } from '../reducers/threadReducer';
import { useNavigate, useParams } from 'react-router-dom';
import EditForm from './EditForm';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const id = useParams().id;
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    if (confirm('Delete?')) {
      navigate('/');
      dispatch(removePost(id));
    }
    return null;
  };

  return (
    <div className="flex flex-col mr-6">
      {isOpen ? (
        <div className="absolute">
          <TiTimes
            onClick={toggleMenu}
            className="md:text-zinc-900 w-6 h-6 cursor-pointer hover:text-orange-700"
          />
          <ul className="absolute bg-zinc-800 right-0 px-2 rounded shadow-lg text-zinc-100 text-sm">
            <li className="hover:text-blue-600 cursor-pointer p-4 text-center">
              <EditForm setIsOpen={setIsOpen} />
            </li>
            <li
              className="hover:text-red-600 cursor-pointer p-4 text-center"
              onClick={handleDelete}
            >
              DELETE
            </li>
          </ul>
        </div>
      ) : (
        <div className="absolute">
          <TiEdit
            onClick={toggleMenu}
            className="text-zinc-900 w-6 h-6 cursor-pointer hover:text-orange-700"
          />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
