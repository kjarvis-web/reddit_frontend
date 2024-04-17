import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUsers } from '../reducers/userReducer';
import { filterChange } from '../reducers/filterReducer';
import { Link } from 'react-router-dom';
import { getComments, getThreads } from '../reducers/threadReducer';

const User = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getComments());
    dispatch(getThreads());
    console.log('use effect');
  }, [dispatch]);

  const id = useParams().id;
  const users = useSelector((state) => state.users);
  const user = users.find((u) => u.id === id);

  const allPosts = useSelector((state) => state.thread.threads);
  const posts = allPosts.filter((post) => post.author === id);
  const allComments = useSelector((state) => state.thread.comments);
  const comments = allComments.filter((comment) => comment.author === id);
  console.log(allPosts);
  const postsAndComments = posts.concat(comments);
  const sorted = [...postsAndComments].sort((a, b) => b.created - a.created);
  const commentsSorted = [...comments].sort((a, b) => b.created - a.created);
  const postsSorted = [...posts].sort((a, b) => b.created - a.created);

  const content = useSelector((state) => {
    if (state.filter === 'COMMENTS') {
      return commentsSorted.map((c) => (
        <div className="bg-zinc-800 md:my-1 p-2 text-sm border-b border-zinc-100" key={c.id}>
          <div>{c.date}</div>
          <div className="whitespace-pre-wrap">{c.text}</div>
        </div>
      ));
    }
    if (state.filter === 'POSTS') {
      return postsSorted.map((p) => (
        <Link to={`/posts/${p.id}`} key={p.id}>
          <div className="bg-zinc-800 md:my-1 p-2 text-sm border-b border-zinc-100">
            <h1 className="font-bold text-xl text-green-500">{p.title}</h1>
            <div>{p.date}</div>
            <div className="whitespace-pre-wrap">{p.content}</div>
          </div>
        </Link>
      ));
    }
    return sorted.map((p) =>
      p.title ? (
        <Link to={`/posts/${p.id}`} key={p.id}>
          <div className="bg-zinc-800 md:my-1 p-2 text-sm border-b border-zinc-100">
            <h1 className="font-bold text-xl text-green-500">{p.title}</h1>
            <div>{p.date}</div>
            <div className="whitespace-pre-wrap">{p.content}</div>
          </div>
        </Link>
      ) : (
        <div className="bg-zinc-800 md:my-1 p-2 text-sm border-b border-zinc-100" key={p.id}>
          <div>{p.date}</div>
          <div className="whitespace-pre-wrap">{p.text}</div>
        </div>
      )
    );
  });

  if (users.length === 0 || !posts || !comments || !user) {
    return <div className="text-zinc-800">loading...</div>;
  }

  const commentUpvotes = user.comments.map((c) => c.upVotes.length);
  const commentDownvotes = user.comments.map((c) => c.downVotes.length);
  const commentKarma =
    commentUpvotes.reduce((acc, curr) => acc + curr, 0) -
    commentDownvotes.reduce((acc, curr) => acc + curr, 0);

  const postUpvotes = user.posts.map((p) => p.upVotes.length);
  const postDownvotes = user.posts.map((p) => p.downVotes.length);
  const postKarma =
    postUpvotes.reduce((acc, curr) => acc + curr, 0) -
    postDownvotes.reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="md:grid grid-cols-4 text-zinc-100">
      <div className="ml-2 col-start-2 col-span-2">
        <h1 className="font-bold text-3xl">{user.username}</h1>
        <p className=" text-sm">Member since {user.date.split(',')[0]}</p>
        <p className=" text-xl">Post Karma: {postKarma}</p>
        <p className=" text-xl">Comment Karma: {commentKarma}</p>
      </div>
      <div className="flex flex-row justify-center gap-4 my-4 col-start-2 col-span-2">
        <button
          className="bg-zinc-800 hover:bg-zinc-900 font-bold py-2 px-4 rounded-full text-sm border border-zinc-100"
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
