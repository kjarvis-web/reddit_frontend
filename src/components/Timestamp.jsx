import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../reducers/userReducer';

/* eslint-disable react/prop-types */
const Timestamp = ({ c }) => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.id === c.user.id);

  // console.log('c id', c.user.id);
  // console.log(comment);
  // console.log('users', users);
  // console.log('c', c);
  // console.log(user);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (!user) return <div>loading...</div>;
  return (
    <div className="font-bold text-green-500">
      <Link to={`/users/${user.id}`} className="hover:underline">
        <span>{c.user.username}</span>
      </Link>{' '}
      {'\u2219'} {c.date}
    </div>
  );
};
export default Timestamp;

// need to get user id nested
