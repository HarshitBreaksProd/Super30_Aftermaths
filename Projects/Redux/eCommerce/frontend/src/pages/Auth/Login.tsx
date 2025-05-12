import { useEffect, useRef, useState } from "react";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { AiOutlineLoading } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCredentials } from "../../redux/feature/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userInfo } = useAppSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      const userInfo = { ...res };
      dispatch(setCredentials(userInfo));
      navigate(redirect);
      toast.success(`Welcome ${userInfo.username}`);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err?.data || err.error);
    }
  };

  return (
    <div className="flex items-center justify-evenly h-[100vh] bg-neutral-950 text-white ">
      <img
        src="https://images.pexels.com/photos/9443251/pexels-photo-9443251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        className="h-[90vh] w-[49%] xl:block md:hidden sm:hidden rounded-lg"
      />
      <div className=" w-[25%]">
        <h1 className="font-medium text-3xl mb-5">Login</h1>
        <form onSubmit={submitHandler} className=" space-y-3">
          <div
            className="flex flex-col w-full border border-gray-700 relative px-5 pt-6 pb-2 hover:cursor-pointer rounded-sm"
            id="email-input-container"
            onClick={() => {
              emailInputRef.current?.focus();
            }}
          >
            <input
              id="email-input"
              type="email"
              className="focus:outline-none font-light hover:cursor-pointer"
              ref={emailInputRef}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label
              id="email-input-label"
              className={`absolute transition-all duration-300 top-4 font-semibold ${
                email ? "top-[2px] text-sm" : ""
              }`}
            >
              Email
            </label>
          </div>
          <div
            className="flex flex-col w-full border border-gray-700 relative px-5 pt-6 pb-2 hover:cursor-pointer rounded-sm"
            id="password-input-container"
            onClick={() => {
              passwordInputRef.current?.focus();
            }}
          >
            <input
              id="password-input"
              type="password"
              className="focus:outline-none hover:cursor-pointer"
              ref={passwordInputRef}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label
              id="password-input-label"
              className={`absolute transition-all duration-300 top-4 font-semibold ${
                password ? "top-[2px] text-sm" : ""
              }`}
            >
              Password
            </label>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-teal-500 text-black font-medium px-3 py-2 rounded-sm mt-2 w-full flex justify-center items-center gap-2 hover:cursor-pointer"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          {isLoading ? <AiOutlineLoading className="animate-spin" /> : ""}
        </form>
        <p className="mt-4">
          New Customer ?{" "}
          <Link
            className="text-teal-400 hover:cursor-pointer hover:underline"
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
          >
            Register
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
