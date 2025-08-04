import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const PostPage2 = () => {
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      return await axios.get("http://localhost:3000/api/v1/posts");
    },
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;

  if (postQuery.isError) return <pre>{postQuery.error.message}</pre>;

  return (
    <div>
      <div className="flex gap-2 text-blue-600">
        <Link to={"/postpage1"}>Post Page 1</Link>
        <Link to={"/"}>Home</Link>
      </div>
      <h1 className="text-5xl my-10">Posts Page 2</h1>
      <h2>
        React query by default set the fetched data to stale as soon as it is
        fetched this can be changed.
      </h2>
      <h2>
        React query also fetches data everytime the page is changed or the
        useQuery hook is mounted based on the staleness of fetched data. If the
        data is not stale it won't fetch again.
      </h2>
      <h2>
        React query also fetches data everytime the tab is changed or the
        browser is unfocused and focused again based on the staleness of fetched
        data. If the data is not stale it won't fetch again.
      </h2>
      <ul className="space-y-2 mt-10">
        {postQuery.data?.data.map((post: any) => (
          <li key={post.id}>
            <h2 className="text-3xl">{post.title}</h2>
            <p>By: {post.author}</p>
          </li>
        ))}
      </ul>
      <ReactQueryDevtools />
    </div>
  );
};

export default PostPage2;
