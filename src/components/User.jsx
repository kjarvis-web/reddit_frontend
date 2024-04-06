import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUsers } from '../reducers/userReducer';

const User = () => {
  const dispatch = useDispatch();

  const id = useParams().id;
  const users = useSelector((state) => state.users);
  const user = users.find((u) => u.id === id);
  console.log(user);

  const posts = user.posts;
  const comments = user.comments;
  console.log(comments);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (users.length === 0) return <div>loading...</div>;

  return (
    <div className="text-zinc-900">
      <h1>{user.username}</h1>
      <div>Comments: {user.comments.length}</div>
      <div>Posts: {user.posts.length}</div>
      {posts.map((p) => (
        <div key={p.id} className="bg-zinc-700 text-zinc-100 my-2 p-2 text-sm">
          <h1 className="font-bold">{p.title}</h1>
          <div>{p.content}</div>
        </div>
      ))}
      <div>
        <h1>Comments</h1>
        {comments.map((c) => (
          <div key={c.id}>{c.text}</div>
        ))}
      </div>
    </div>
  );
};

export default User;
