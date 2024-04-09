import { useState } from 'react';
import { TiEdit } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { removePost } from '../reducers/threadReducer';
import { useNavigate, useParams } from 'react-router-dom';
import EditForm from './EditForm';

const DropdownComment = () => {
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
    <div>
      {isOpen ? (
        <div>
          <TiEdit onClick={toggleMenu} className="w-5 h-5 cursor-pointer hover:text-orange-700" />
          <ul className="absolute bg-white rounded shadow-lg text-zinc-900 text-sm font-semibold">
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
        <TiEdit onClick={toggleMenu} className="w-5 h-5 cursor-pointer hover:text-orange-700" />
      )}
    </div>
  );
};

export default DropdownComment;
