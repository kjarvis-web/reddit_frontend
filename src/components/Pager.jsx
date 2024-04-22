import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { firstPage, lastPage, next, previous } from '../reducers/pageReducer';
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';

const Pager = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page.number);
  const total = useSelector((state) => state.page.total);
  return (
    <div className="flex gap-12 justify-center mt-4">
      <button
        className="flex items-center justify-center"
        disabled={page === 0}
        onClick={() => dispatch(firstPage())}
      >
        <MdOutlineKeyboardDoubleArrowLeft />
        First
      </button>
      <button
        className="flex items-center justify-center"
        disabled={page === 0}
        onClick={() => dispatch(previous())}
      >
        <MdOutlineKeyboardArrowLeft />
        Previous
      </button>
      <button
        disabled={page === total - 1}
        className="flex items-center justify-center"
        onClick={() => dispatch(next())}
      >
        Next
        <MdOutlineKeyboardArrowRight />
      </button>
      <button
        disabled={page === total - 1}
        className="flex items-center justify-center"
        onClick={() => dispatch(lastPage())}
      >
        Last
        <MdOutlineKeyboardDoubleArrowRight />
      </button>
    </div>
  );
};

export default Pager;
