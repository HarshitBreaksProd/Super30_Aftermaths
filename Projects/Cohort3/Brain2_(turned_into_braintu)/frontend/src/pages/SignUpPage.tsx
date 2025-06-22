import { useEffect, useState } from "react";
import { IoEnter } from "react-icons/io5";
import Button from "../components/ui/Button";
import { BiBrain } from "react-icons/bi";
import { toast } from "react-toastify";
import { useSignupMutation } from "../store/services/authApiSlice";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId") || "";

  useEffect(() => {
    if (userId != "") {
      navigate("/dashboard");
    }
  }, [navigate, userId]);

  const [signup, { isLoading }] = useSignupMutation();

  const onSubmit = async () => {
    if (username.length < 3) {
      toast.error("Username cannot have less than 3 characters");
      return;
    }
    if (password.length < 8) {
      toast.error("Password cannot have less than 8 characters");
      return;
    }
    if (password !== verifyPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const data = {
      username,
      password,
    };

    try {
      const res = await signup(data);
      if (res.error) {
        const errMsg =
          (res.error as { data?: { message?: string } })?.data?.message ||
          "An error occurred";
        toast.error(errMsg);
        return;
      }
      toast.success(res.data.message);
      localStorage.setItem("userId", res.data.userId);
      navigate("/dashboard");
      return;
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong, Please refresh and retry");
      return;
    }
  };

  return (
    <div className="relative h-screen w-screen bg-gray-100">
      <div className="absolute h-screen w-screen bg-[radial-gradient(#c6d2ff_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
        <div className="h-screen w-screen flex flex-col justify-center items-center">
          <div className="-translate-y-5 max-w-96 min-w-96 ">
            <div className="space-y-5 relative shadow rounded-xl px-4 pt-5 pb-2 bg-white">
              <div className="absolute -top-5 left-3 bg-white border-l-4 border-b-4 border-t border-r rounded-lg px-1 py-1 text-indigo-500 text-3xl font-semibold flex items-center gap-2">
                <h2 className="">Sign Up</h2>
                <IoEnter />
              </div>
              <div className="flex flex-col gap-3 mt-5">
                <div className="flex flex-col relative py-2">
                  <label
                    className={`absolute -top-1.5 bg-white left-2 text-lg text-indigo-500 pointer-events-none`}
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="JohnDoe123"
                    className="px-4 py-2 border border-indigo-200 tracking-wider focus:ring-0 focus:outline-none font-light rounded-lg placeholder:text-gray-500"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    value={username}
                  />
                </div>
                <div className="flex flex-col relative py-2">
                  <label
                    className={`absolute -top-1.5 bg-white left-2 text-lg text-indigo-500 pointer-events-none`}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Choose your password"
                    className="px-4 py-2 border border-indigo-200 tracking-wider focus:ring-0 focus:outline-none font-light rounded-lg placeholder:text-gray-500"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                  />
                </div>
                <div className="flex flex-col relative py-2">
                  <label
                    className={`absolute -top-1.5 bg-white left-2 text-lg text-indigo-500 pointer-events-none`}
                  >
                    Verify Password
                  </label>
                  <input
                    type="text"
                    placeholder="Verify your password"
                    className="px-4 py-2 border border-indigo-200 tracking-wider focus:ring-0 focus:outline-none font-light rounded-lg placeholder:text-gray-500"
                    onChange={(e) => {
                      setVerifyPassword(e.target.value);
                    }}
                    value={verifyPassword}
                  />
                </div>
              </div>
              <div>
                <Button
                  variant="primary"
                  text="Sign Up"
                  size="md"
                  className="w-full! flex! items-center! justify-center! text-lg! bg-indigo-500!"
                  onClick={onSubmit}
                  endIcon={
                    isLoading ? (
                      <AiOutlineLoading className="animate-spin" />
                    ) : (
                      <IoEnter />
                    )
                  }
                />
              </div>
              <p className="text-gray-500 text-sm">
                Already have an account?{" "}
                <span
                  className="text-indigo-500 hover:cursor-pointer"
                  onClick={() => navigate("/signin")}
                >
                  Sign in
                </span>
              </p>
            </div>
            <div className="flex justify-end text-indigo-500 -translate-0.5">
              <span className="flex items-center">
                <BiBrain />
                <h1 className="">Braintu.ai</h1>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
