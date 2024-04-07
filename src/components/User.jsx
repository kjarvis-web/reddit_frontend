import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUsers } from '../reducers/userReducer';
import { filterChange } from '../reducers/filterReducer';

const User = () => {
  const dispatch = useDispatch();

  const id = useParams().id;
  const users = useSelector((state) => state.users);
  const user = users.find((u) => u.id === id);
  console.log(user);

  const posts = user.posts;
  const comments = user.comments;

  const postsAndComments = posts.concat(comments);
  const sorted = [...postsAndComments].sort((a, b) => a.created - b.created);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const content = useSelector((state) => {
    if (state.filter === 'COMMENTS') {
      return comments.map((c) => (
        <div className="bg-zinc-800 rounded my-1 p-2 text-sm" key={c.id}>
          {c.text}
        </div>
      ));
    }
    if (state.filter === 'POSTS') {
      return posts.map((p) => (
        <div className="bg-zinc-800 rounded my-1 p-2 text-sm" key={p.id}>
          {p.title}
        </div>
      ));
    }
    return sorted.map((p) =>
      p.title ? (
        <div className="bg-zinc-800 rounded my-1 p-2 text-sm" key={p.id}>
          <h1 className="font-bold text-xl text-green-500">{p.title}</h1>
          {p.content} {p.date}
        </div>
      ) : (
        <div className="bg-zinc-800 rounded my-1 p-2 text-sm" key={p.id}>
          {p.text} {p.date}
        </div>
      )
    );
  });

  if (users.length === 0) return <div>loading...</div>;

  return (
    <div className="grid grid-cols-4">
      <div className="col-start-2">
        <h1 className="font-bold text-3xl text-zinc-800">{user.username}</h1>
        <p className="text-zinc-800 text-sm">Member since {user.date.split(',')[0]}</p>
      </div>
      <div className="flex flex-row justify-center gap-4 my-4 col-start-2 col-span-2">
        <button
          className="bg-zinc-800 hover:bg-zinc-900 font-bold py-2 px-4 rounded-full text-sm"
          onClick={() => dispatch(filterChange('ALL'))}
        >
          All
        </button>
        <button
          className="bg-orange-600 hover:bg-orange-700 font-bold py-2 px-4 rounded-full text-sm"
          onClick={() => dispatch(filterChange('COMMENTS'))}
        >
          Comments
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded-full text-sm"
          onClick={() => dispatch(filterChange('POSTS'))}
        >
          Posts
        </button>
      </div>
      <div className="col-start-2 col-span-2">{!content ? <div>null</div> : content}</div>
    </div>
  );
};

export default User;
