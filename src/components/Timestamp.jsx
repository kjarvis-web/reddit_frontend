import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../reducers/userReducer';
import { getComments } from '../reducers/threadReducer';

/* eslint-disable react/prop-types */
const Timestamp = ({ c }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getComments());
  }, [dispatch]);

  const users = useSelector((state) => state.user.users);
  const user = users.find((user) => user.id === c.author);

  if (!user) return <div>loading...</div>;
  return (
    <div className="author">
      <Link to={`/users/${c.author}`}>
        <span className="font-bold hover:underline">{user.username}</span>
      </Link>{' '}
      <span className="text-xs">
        {'\u2219'} {c.date}
      </span>
    </div>
  );
};
export default Timestamp;
