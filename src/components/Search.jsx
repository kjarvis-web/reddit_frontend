import { IoSearch } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAll, resetQuery, setQuery, setResults } from '../reducers/queryReducer';
import { useEffect } from 'react';
const Search = () => {
  const query = useSelector((state) => state.query.key);
  const allPosts = useSelector((state) => state.query.posts);
  const allImages = useSelector((state) => state.images);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const results = allPosts.filter((p) => {
    const user = users.find((user) => user.id === p.author);
    return (
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.content.toLowerCase().includes(query.toLowerCase()) ||
      user.username.toLowerCase().includes(query.toLowerCase())
    );
  });

  const resultSliced = results.slice(0, 5);
  const resultTotal = results.length - resultSliced.length;

  const handleSearch = (e) => {
    dispatch(setQuery(e.target.value));
  };

  const handleSearchPage = () => {
    dispatch(setResults(results));
    dispatch(resetQuery());
  };

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  return (
    <div className="relative">
      <div className="search-container flex items-center gap-2">
        <label>
          <IoSearch className="w-5 h-5" />
        </label>
        <input
          type="text"
          value={query}
          className="rounded-full focus:outline-none text-zinc-900 px-2"
          onChange={handleSearch}
        />
      </div>
      {query !== '' && query.length > 3 && (
        <div className="bg-zinc-800 absolute w-full shadow-lg rounded">
          {resultSliced.map((r) => {
            const image = allImages.find((image) => image.threadId === r.id);
            return (
              <div className="results-container text-sm border-zinc-700 p-4" key={r.id}>
                <Link to={`/posts/${r.id}`}>
                  <div className="grid grid-cols-3">
                    <h1 className="col-span-3 font-bold">{r.title}</h1>
                    <div className="truncate col-start-1">{r.content}</div>
                    {image && (
                      <img src={image.url} alt={image.filename} className="col-start-3 rounded" />
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
          {resultTotal !== 0 && (
            <Link to="/search" onClick={handleSearchPage}>
              <div className="text-center p-2 text-sm">{resultTotal} more results...</div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
