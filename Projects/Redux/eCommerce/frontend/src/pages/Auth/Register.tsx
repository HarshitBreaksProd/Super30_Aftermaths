import { useEffect, useRef, useState } from "react";
import "./Register.css";
import { Link, useLocation, useNavigate } from "react-router";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { AiOutlineLoading } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCredentials } from "../../redux/feature/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userInfo } = useAppSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match!");
      return;
    }

    try {
      const res = await register({ username, email, password }).unwrap();
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
        src="https://images.pexels.com/photos/9443229/pexels-photo-9443229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        className="h-[90vh] w-[49%] xl:block md:hidden sm:hidden rounded-lg"
      />
      <div className=" w-[25%]">
        <h1 className="font-medium text-3xl mb-5">Register</h1>
        <form onSubmit={submitHandler} className=" space-y-3">
          <div
            className="flex flex-col w-full border border-gray-700 relative px-5 pt-6 pb-2 hover:cursor-pointer rounded-sm"
            id="username-input-container"
            onClick={() => {
              usernameInputRef.current?.focus();
            }}
          >
            <input
              id="username-input"
              type="text"
              className="focus:outline-none font-light hover:cursor-pointer"
              ref={usernameInputRef}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <label
              id="username-input-label"
              className={`absolute transition-all duration-300 top-4 font-semibold ${
                username ? "top-[2px] text-sm" : ""
              }`}
            >
              Username
            </label>
          </div>
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
          <div
            className="flex flex-col w-full border border-gray-700 relative px-5 pt-6 pb-2 hover:cursor-pointer rounded-sm"
            id="confirm-password-input-container"
            onClick={() => {
              confirmPasswordInputRef.current?.focus();
            }}
          >
            <input
              id="confirm-password-input"
              type="text"
              className="focus:outline-none hover:cursor-pointer"
              ref={confirmPasswordInputRef}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <label
              id="confirm-password-input-label"
              className={`absolute transition-all duration-300 top-4 font-semibold ${
                confirmPassword ? "top-[2px] text-sm" : ""
              }`}
            >
              Confirm Password
            </label>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-teal-500 text-black font-medium px-3 py-2 rounded-sm mt-2 w-full flex justify-center items-center gap-2 hover:cursor-pointer"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          {isLoading ? <AiOutlineLoading className="animate-spin" /> : ""}
        </form>
        <p className="mt-4">
          Already have an account ?{" "}
          <Link
            className="text-teal-400 hover:cursor-pointer hover:underline"
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
          >
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
