import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { next, previous } from '../reducers/pageReducer';
import { TiArrowLeft, TiArrowRight } from 'react-icons/ti';

const Pager = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page.number);
  const total = useSelector((state) => state.page.total);
  return (
    <div className="flex gap-12 justify-center mt-4">
      <button
        className="flex items-center justify-center"
        disabled={page === 0}
        onClick={() => dispatch(previous())}
      >
        <TiArrowLeft />
        Previous
      </button>
      <button
        disabled={page === total - 1}
        className="flex items-center justify-center"
        onClick={() => dispatch(next())}
      >
        Next
        <TiArrowRight />
      </button>
    </div>
  );
};

export default Pager;
