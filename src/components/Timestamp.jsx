import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
const Timestamp = ({ c }) => {
  return (
    <div className="font-bold">
      <Link to={`/users/${c.user.id}`}>
        <span>{c.username}</span>
      </Link>{' '}
      {'\u2219'} {c.created}
    </div>
  );
};
export default Timestamp;
