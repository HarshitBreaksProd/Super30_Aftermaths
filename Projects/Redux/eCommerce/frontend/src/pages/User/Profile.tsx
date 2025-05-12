import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useUpdateProfileMutation } from "../../redux/api/userApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/feature/auth/authSlice";
import { Link } from "react-router";

const Profile = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { userInfo } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const [updateUserProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await updateUserProfile({
        _id: userInfo._id,
        username,
        email,
        password,
      }).unwrap();

      console.log(res);

      dispatch(setCredentials({ ...res }));
      toast.success("Profile Updated Successfully");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err?.data || err.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh] bg-neutral-950 text-white ">
      <div className="w-[25%] -translate-y-10">
        <h1 className="font-medium text-3xl mb-5">Profile</h1>
        <form onSubmit={submitHandler} className=" space-y-3">
          <input
            placeholder="Username"
            className="w-full border border-neutral-600 text-white placeholder-neutral-500 px-2 py-3 rounded"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            placeholder="Email"
            type="email"
            className="w-full border border-neutral-600 text-white placeholder-neutral-500 px-2 py-3 rounded"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            placeholder="Password"
            type="password"
            className="w-full border border-neutral-600 text-white placeholder-neutral-500 px-2 py-3 rounded"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            placeholder="Confirm Password"
            className="w-full border border-neutral-600 text-white placeholder-neutral-500 px-2 py-3 rounded"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <div className="flex justify-between gap-3">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-teal-500 text-black font-medium px-3 py-2 rounded-sm mt-2 w-full flex justify-center items-center gap-2 hover:cursor-pointer"
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
            <Link
              to={"/user-profile"}
              className="border border-teal-500 text-teal-500 font-medium px-3 py-2 rounded-sm mt-2 w-full flex justify-center items-center gap-2 hover:cursor-pointer"
            >
              My Orders
            </Link>
          </div>
          {isLoading ? <AiOutlineLoading className="animate-spin" /> : ""}
        </form>
      </div>
    </div>
  );
};

export default Profile;
