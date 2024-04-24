import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const results = useSelector((state) => state.query.results);
  const comments = useSelector((state) => state.thread.comments);
  const images = useSelector((state) => state.images);

  return (
    <div className="md:grid-cols-8 gap-y-2">
      <div className="text-green-500 col-start-2 text-2xl font-bold ml-2">
        {results.length} results...
      </div>
      {results.map((post) => {
        const numberOfComments = comments.filter((c) => c.thread === post.id);
        const image = images.find((image) => image.threadId === post.id);
        return (
          <div
            className="md:col-start-2 md:col-span-6 flex items-center gap-2 md:bg-zinc-200 md:text-zinc-800 p-2 text-sm md:rounded border-b border-zinc-700"
            key={post.id}
          >
            <Link to={`/posts/${post.id}`} className="grow">
              <div className="grid grid-cols-3 gap-y-2">
                <h1 className="font-bold text-base col-span-3">{post.title}</h1>
                <div className="col-start-1 col-span-2 flex flex-col justify-between">
                  <div className="truncate">{post.content}</div>
                  <div className="text-xs mt-2">{numberOfComments.length} comments</div>
                </div>
                {image && (
                  <img
                    src={image.url}
                    className="rounded col-start-3 place-self-end md:h-36"
                    alt={image.filename}
                  />
                )}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
