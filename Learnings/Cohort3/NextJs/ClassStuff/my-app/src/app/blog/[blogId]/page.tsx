import axios from "axios";

export default async function page({
  params,
}: {
  params: Promise<{ blogId: number }>;
}) {
  const resolvedparams = await params;
  const blogId = resolvedparams.blogId;
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${blogId}`
  );

  const data = res.data;

  return (
    <div>
      Blog Page {blogId}
      <div key={1}>{data.title}</div>
      <div key={2}>{data.body}</div>
      hello
    </div>
  );
}
