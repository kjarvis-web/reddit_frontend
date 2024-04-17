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

  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.id === c.author);
  // const comments = useSelector((state) => state.thread.comments);
  // const findUsername = comments.find((comment) => comment.author === c.author.username);
  // console.log('findusername', findUsername);
  // console.log(comments);
  // console.log('c', c);
  console.log('user', user);
  console.log('author', c.author);

  if (!user) return <div>loading...</div>;
  return (
    <div>
      <Link to={`/users/${user.id}`}>
        <span className="font-bold md:text-green-500 hover:underline">{user.username}</span>
      </Link>{' '}
      {'\u2219'} {c.date}
    </div>
  );
};
export default Timestamp;
