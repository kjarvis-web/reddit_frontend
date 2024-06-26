/* eslint-disable react/prop-types */
import { useState } from 'react';
import { TiEdit } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { updateComment } from '../reducers/threadReducer';
import EditCommentForm from './EditCommentForm';

const DropdownComment = ({ comment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    if (confirm('Delete?')) {
      const newComment = {
        text: `[This user deleted their comment]`,
        id: comment.id,
        removed: true,
      };
      dispatch(updateComment(newComment));
      setIsOpen(false);
    }
    return null;
  };

  return (
    <div className="edit">
      {isOpen ? (
        <div>
          <TiEdit onClick={toggleMenu} className="w-5 h-5 cursor-pointer hover:text-orange-600" />
          <ul className="absolute bg-zinc-200 text-zinc-800 rounded shadow-lg text-sm">
            <li className="hover:text-blue-600 cursor-pointer p-4 text-center">
              <EditCommentForm comment={comment} setIsOpen={setIsOpen} />
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
        <TiEdit onClick={toggleMenu} className="w-5 h-5 cursor-pointer hover:text-orange-600" />
      )}
    </div>
  );
};

export default DropdownComment;
