import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';
import { useSelector } from 'react-redux';

const CommentSort = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  return (
    <div className="text-zinc-800 border border-zinc-800 rounded-full p-2 bg-zinc-200 font-bold hover:bg-zinc-100 group">
      <label>Sort by: </label>
      <select
        value={filter}
        className="rounded bg-zinc-200 group-hover:bg-zinc-100 cursor-pointer focus:outline-none"
        onChange={(e) => dispatch(filterChange(e.target.value))}
      >
        <option value="NEW">New</option>
        <option value="OLD">Old</option>
        <option value="TOP">Top</option>
      </select>
    </div>
  );
};

export default CommentSort;
