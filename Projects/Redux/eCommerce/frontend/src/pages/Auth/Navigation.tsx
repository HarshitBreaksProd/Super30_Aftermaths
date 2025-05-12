import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { FaChevronDown, FaHeart } from "react-icons/fa";
import "./Navigation.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/feature/auth/authSlice";
import { useLogoutMutation } from "../../redux/api/userApiSlice";

const Navigation = () => {
  const { userInfo } = useAppSelector((state) => state.auth);

  const [dropDown, setDropDown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropDown = () => {
    setDropDown((prev) => !prev);
  };

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        style={{ zIndex: 999 }}
        className={`${
          showSidebar ? "hidden" : "flex"
        }xl:flex lg:flex md:hidden sm:hidden flex-col h-[100vh] justify-between bg-black text-white w-[4%] hover:w-[15%] overflow-hidden p-4 fixed transition-all duration-300`}
        id="navigation-container"
      >
        <div className="flex flex-col space-y-4 justify-center mt-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive ? "underline-offset-3 underline decoration-0" : ""
              } flex mt-3 relative`
            }
          >
            <div className="flex gap-2 items-center transition-transform transform hover:translate-x-2">
              <AiOutlineHome size={24} />
              <span className="nav-item-name hidden">Home</span>
            </div>
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `${
                isActive ? "underline-offset-3 underline decoration-0" : ""
              } flex mt-3 relative`
            }
          >
            <div className="flex gap-2 items-center transition-transform transform hover:translate-x-2">
              <AiOutlineShopping size={24} />
              <span className="nav-item-name hidden">Shop</span>
            </div>
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `${
                isActive ? "underline-offset-3 underline decoration-0" : ""
              } flex mt-3 relative`
            }
          >
            <div className="flex gap-2 items-center transition-transform transform hover:translate-x-2">
              <AiOutlineShoppingCart size={24} />
              <span className="nav-item-name hidden">Cart</span>
            </div>
          </NavLink>
          <NavLink
            to="/favourite"
            className={({ isActive }) =>
              `${
                isActive ? "underline-offset-3 underline decoration-0" : ""
              } flex mt-3 relative`
            }
          >
            <div className="flex gap-2 items-center transition-transform transform hover:translate-x-2">
              <FaHeart size={22} className="ml-1 my-1" />
              <span className="nav-item-name hidden">Favourite</span>
            </div>
          </NavLink>
        </div>

        <div className="relative">
          <button
            onClick={toggleDropDown}
            className="flex items-center text-gray-700 relative z-[999] focus:outline-none w-full"
          >
            {userInfo ? (
              <div className="flex gap-2 items-center text-white">
                <AiOutlineUser size={24} />
                <span className="text-white nav-item-name hidden">
                  {userInfo.username}
                </span>
                <FaChevronDown
                  className={`text-white duration-500 nav-item-name hidden ${
                    dropDown ? "transform -rotate-180" : ""
                  }`}
                />
              </div>
            ) : (
              <></>
            )}
          </button>
          <ul
            className={`absolute right-0 mt-2 mr-15 text-neutral-400 transition-all duration-300 ${
              dropDown
                ? userInfo?.isAdmin
                  ? "-top-72 opacity-100 pointer-events-auto"
                  : "-top-20 opacity-100 pointer-events-auto"
                : "top-0 opacity-0 pointer-events-none"
            }`}
          >
            {userInfo && (
              <>
                {userInfo?.isAdmin && (
                  <>
                    <li>
                      <Link
                        to="admin/dashboard"
                        className="block px-4 py-2 underline-offset-1 hover:underline bg-neutral-900"
                      >
                        DashBoard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="admin/productlist"
                        className="block px-4 py-2 underline-offset-1 hover:underline bg-neutral-900"
                      >
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="admin/categorylist"
                        className="block px-4 py-2 underline-offset-1 hover:underline bg-neutral-900"
                      >
                        Categories
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="admin/orderlist"
                        className="block px-4 py-2 underline-offset-1 hover:underline bg-neutral-900"
                      >
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="admin/userlist"
                        className="block px-4 py-2 underline-offset-1 hover:underline bg-neutral-900"
                      >
                        Users
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link
                    to="profile"
                    className="block px-4 py-2 underline-offset-1 hover:underline bg-neutral-900"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="login"
                    onClick={logoutHandler}
                    className="block px-4 py-2 underline-offset-1 hover:underline bg-neutral-900"
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {!userInfo && (
          <ul className="space-y-4">
            <li>
              <Link to="/login" className="flex relative">
                <div className="flex gap-2 items-center transition-transform transform hover:translate-x-2">
                  <AiOutlineLogin size={24} />
                  <span className="nav-item-name hidden">Login</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/register" className="flex relative">
                <div className="flex gap-2 items-center transition-transform transform hover:translate-x-2">
                  <AiOutlineUserAdd size={24} />
                  <span className="nav-item-name hidden">Register</span>
                </div>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Navigation;
