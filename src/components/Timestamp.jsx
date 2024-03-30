/* eslint-disable react/prop-types */
const Timestamp = ({ c }) => {
  return (
    <div className="font-bold">
      <span>{c.username}</span> {'\u2219'} {c.created}
    </div>
  );
};
export default Timestamp;
