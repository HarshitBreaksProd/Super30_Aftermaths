import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import { Toaster } from "./components/ui/sonner";
import Signin from "./pages/Signin";
import Chats from "./pages/Chats";
import CreateChat from "./pages/CreateChat";
import JoinRoom from "./pages/JoinRoom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/chats" element={<CreateChat />} />
          <Route path="/" element={<CreateChat />} />
          <Route path="/join" element={<JoinRoom />} />
          <Route path="/chats/:roomId" element={<Chats />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
