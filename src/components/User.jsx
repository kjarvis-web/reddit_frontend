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
  const posts = allPosts.filter((post) => post.user.id === id);
  const allComments = useSelector((state) => state.thread.comments);
  const comments = allComments.filter((comment) => comment.user.id === id);

  const postsAndComments = posts.concat(comments);
  const sorted = [...postsAndComments].sort((a, b) => b.created - a.created);
  const commentsSorted = [...comments].sort((a, b) => b.created - a.created);
  const postsSorted = [...posts].sort((a, b) => b.created - a.created);

  const content = useSelector((state) => {
    if (state.filter === 'COMMENTS') {
      return commentsSorted.map((c) => (
        <div className="bg-zinc-800 rounded my-1 p-2 text-sm" key={c.id}>
          <div>{c.date}</div>
          <div>{c.text}</div>
          <div>
            {/* replied to {allCommentsAndPosts.find((all) => all.id === c.parentId).user.username} */}
          </div>
          {/* <div>{console.log(findOp.find((obj) => obj.id == c.id))}</div> */}
        </div>
      ));
    }
    if (state.filter === 'POSTS') {
      return postsSorted.map((p) => (
        <Link to={`/posts/${p.id}`} key={p.id}>
          <div className="bg-zinc-800 rounded my-1 p-2 text-sm">
            <h1 className="font-bold text-xl text-green-500">{p.title}</h1>
            <div>{p.date}</div>
            <div>{p.content}</div>
          </div>
        </Link>
      ));
    }
    return sorted.map((p) =>
      p.title ? (
        <Link to={`/posts/${p.id}`} key={p.id}>
          <div className="bg-zinc-800 rounded my-1 p-2 text-sm">
            <h1 className="font-bold text-xl text-green-500">{p.title}</h1>
            <div>{p.date}</div>
            <div>{p.content}</div>
          </div>
        </Link>
      ) : (
        <div className="bg-zinc-800 rounded my-1 p-2 text-sm" key={p.id}>
          <div>{p.date}</div>
          <div>{p.text}</div>
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
    <div className="grid grid-cols-4">
      <div className="col-start-2 col-span-2">
        <h1 className="font-bold text-3xl text-zinc-800">{user.username}</h1>
        <p className="text-zinc-800 text-sm">Member since {user.date.split(',')[0]}</p>
        <p className="text-zinc-800 text-xl">Post Karma: {postKarma}</p>
        <p className="text-zinc-800 text-xl">Comment Karma: {commentKarma}</p>
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
