import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="">
        <Outlet />
      </main>
    </>
  );
};

export default App;
