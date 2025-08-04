import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function Example() {
  const queryClient = useQueryClient();
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      return await axios.get("http://localhost:3000/api/v1/posts");
    },
  });

  const addPostMutation = useMutation({
    mutationFn: async (post: any) => {
      return await axios.post("http://localhost:3000/api/v1/posts", post);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;

  if (postQuery.isError) return <pre>{postQuery.error.message}</pre>;

  return (
    <div>
      <div className="flex gap-2 text-blue-600">
        <Link to={"/postpage1"}>Post Page 1</Link>
        <Link to={"/postpage2"}>Post Page 2</Link>
      </div>
      <div className="mt-3">
        {/* TIPS TO SET QUERY KEYS */}
        <h1 className="mb-2">TIPS TO SET QUERY KEYS</h1>
        <ul>
          <li>/posts ---- ["posts"]</li>
          <li>/posts/1 ---- ["posts", post.id]</li>
          <li>
            /posts?authorId=1 ---- ["posts", {"{"}authorId: 1{"}"}]
          </li>
          <li>/posts/2/comments ---- ["posts", post.id, "comments"]</li>
        </ul>
      </div>
      <h1 className="text-5xl my-10">Posts</h1>
      <ul className="space-y-2">
        {postQuery.data?.data.map((post: any) => (
          <li key={post.id}>
            <h2 className="text-3xl">{post.title}</h2>
            <p>By: {post.author}</p>
          </li>
        ))}
      </ul>
      <button
        className="bg-blue-300 p-2 px-3 mt-10 cursor-pointer"
        disabled={addPostMutation.isPending}
        onClick={() => {
          addPostMutation.mutate({
            id: Date.now(),
            title: "New Post",
            author: "Anika Panika",
          });
        }}
      >
        Add post
      </button>
      <ReactQueryDevtools />
    </div>
  );
}

export default Example;
