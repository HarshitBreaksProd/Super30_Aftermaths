import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

import Login from "./pages/Auth/Login.tsx";
import Register from "./pages/Auth/Register.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Profile from "./pages/User/Profile.tsx";
import AdminRoute from "./pages/Admin/AdminRoute.tsx";
import UserList from "./pages/Admin/UserList.tsx";
import CategoryList from "./pages/Admin/CategoryList.tsx";
import ProductList from "./pages/Admin/Product/ProductList.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Authenticated Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="productList" element={<ProductList />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
