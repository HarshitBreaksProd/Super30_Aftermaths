import { BrowserRouter, Route, Routes } from "react-router-dom";
import Example from "./pages/example";
import PostPage1 from "./pages/postPage1";
import PostPage2 from "./pages/postPage2";
import Post from "./pages/Post";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Example />} />
          <Route path="/postpage1" element={<PostPage1 />} />
          <Route path="/postpage2" element={<PostPage2 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
