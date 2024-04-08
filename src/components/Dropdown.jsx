import { useState } from 'react';
import { TiEdit } from 'react-icons/ti';
import { TiTimes } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { removePost } from '../reducers/threadReducer';
import { useNavigate, useParams } from 'react-router-dom';
import EditForm from './EditForm';
import ModalReply from './ModalReply';

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
      window.location.reload();
    }
    return null;
  };

  return (
    <div className="flex flex-col">
      {isOpen ? (
        <div className="flex flex-col items-end">
          <TiTimes onClick={toggleMenu} className="w-6 h-6 cursor-pointer hover:text-orange-600" />
          <ul className="absolute top-48 bg-white border rounded shadow-lg text-zinc-900">
            <div className="absolute top-0 right-0 -mt-1 mr-1 w-6 h-6 bg-white transform rotate-45"></div>
            <li className="hover:text-blue-600 cursor-pointer p-4 text-center">
              <EditForm />
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
        <TiEdit onClick={toggleMenu} className="w-6 h-6 cursor-pointer hover:text-orange-600" />
      )}
    </div>
  );
};

export default Dropdown;
