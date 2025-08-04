import express, { Router } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const router = Router();

const POSTS = [
  { id: 1, title: "Hello World", author: "John Doe" },
  { id: 2, title: "Hello World 2", author: "Jane Doe" },
  { id: 3, title: "Hello World 3", author: "John Doe" },
  { id: 4, title: "Hello World 4", author: "Jane Doe" },
];

router.get("/posts", (req, res) => {
  return res.json(POSTS);
});

router.post("/posts", (req, res) => {
  const post = req.body;
  console.log(post);
  POSTS.push(post);
  console.log(POSTS);
  return res.json(post);
});

router.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = POSTS.find((post) => post.id === parseInt(id));
  return res.json(post);
});

router.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = req.body;
  const index = POSTS.findIndex((post) => post.id === parseInt(id));
  POSTS[index] = post;
  return res.json(post);
});

router.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  const index = POSTS.findIndex((post) => post.id === parseInt(id));
  POSTS.splice(index, 1);
  return res.json({ message: "Post deleted" });
});

app.use("/api/v1", router);

app.get("/healthcheck", (req, res) => res.send("Hello World"));

app.listen(3000, () => console.log("Server is running on port 3000"));
