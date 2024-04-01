import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../reducers/userReducer';

/* eslint-disable react/prop-types */
const Timestamp = ({ c }) => {
  const comments = useSelector((state) => state.thread.comments);
  const comment = comments.find((comment) => comment.id === c.id);
  console.log(comment);
  const dispatch = useDispatch();

  console.log('c id', c.id);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <div className="font-bold">
      {/* <Link to={`/users/${user.id}`}> */}
      <span>{c.username}</span>
      {/* </Link> */}
      {'\u2219'} {c.date}
    </div>
  );
};
export default Timestamp;

// need to get user id nested
