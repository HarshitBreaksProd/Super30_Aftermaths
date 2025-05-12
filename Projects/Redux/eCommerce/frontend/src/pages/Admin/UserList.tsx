import { AiOutlineLoading } from "react-icons/ai";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserDetailsMutation,
} from "../../redux/api/userApiSlice";
import { FaCheck, FaEdit, FaSave, FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";

interface User {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

const UserList = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery({});

  const [editUserId, setEditUserId] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [deleteUser, { isLoading: deleteUserLoading }] =
    useDeleteUserMutation();

  const deleteHandler = async (userId: string) => {
    if (window.confirm("Are You Sure")) {
      try {
        await deleteUser(userId);
        refetch();
        toast.success("User Deleted Successfully");
      } catch (err) {
        console.error(err);
        toast.error(
          err?.data?.message ||
            err?.data ||
            err?.error ||
            "Error Updating details"
        );
      }
    }
  };

  const startEdit = (id: string, username: string, email: string) => {
    setEditUserId(id);
    setEditUsername(username);
    setEditEmail(email);
  };

  const [updateUserDetails, { isLoading: updateUserLoading }] =
    useUpdateUserDetailsMutation();

  const updateHandler = async (userId: string) => {
    try {
      await updateUserDetails({
        userId: userId,
        username: editUsername,
        email: editEmail,
      });
      setEditUserId("");
      refetch();
      toast.success("User Updated Successfully");
    } catch (err) {
      console.error(err);
      toast.error(
        err?.data?.message ||
          err?.data ||
          err?.error ||
          "Error Updating details"
      );
    }
  };

  if (isLoading) return <AiOutlineLoading className="animate-spin" />;

  if (error)
    return (
      <div className="text-red-500">
        Error loading users: {error.toString()}
      </div>
    );

  if (!users) return <div>No users found</div>;

  return (
    <div className="flex justify-center h-[100vh] w-full pl-[6%] pr-[2%] py-12 bg-neutral-950 text-white ">
      <div className="w-full">
        <h1 className="font-medium text-3xl mb-5">Users</h1>
        <table className="w-full pr-10 mt-10">
          <thead className="">
            <tr>
              <th className="px-4 py-2 text-left text-xl border border-neutral-700">
                Id
              </th>
              <th className="px-4 py-2 text-left text-xl border border-neutral-700">
                Username
              </th>
              <th className="px-4 py-2 text-left text-xl border border-neutral-700">
                Email
              </th>
              <th className="px-4 py-2 text-left text-xl border border-neutral-700">
                Admin
              </th>
              <th className="px-4 py-2 text-left text-xl border border-neutral-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user._id}>
                <td className="px-4 py-2 text-left border border-neutral-800">
                  {user._id}
                </td>
                <td className="px-4 py-2 text-left border border-neutral-800">
                  {editUserId === user._id ? (
                    <input
                      className="border border-neutral-400 rounded px-2 py-1"
                      placeholder="Username"
                      value={editUsername}
                      onChange={(e) => {
                        setEditUsername(e.target.value);
                      }}
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td className="px-4 py-2 text-left border border-neutral-800">
                  {editUserId === user._id ? (
                    <input
                      className="border border-neutral-400 rounded px-2 py-1"
                      placeholder="Email"
                      value={editEmail}
                      onChange={(e) => {
                        setEditEmail(e.target.value);
                      }}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="px-4 py-2 text-center border border-neutral-800">
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td className="px-4 py-2 space-x-5 border border-neutral-800">
                  {editUserId === user._id ? (
                    <button
                      className="text-green-400 px-2 py-1 hover:cursor-pointer rounded"
                      onClick={() => updateHandler(user._id)}
                    >
                      {editUserId === user._id && updateUserLoading ? (
                        <AiOutlineLoading className="animate-spin" />
                      ) : (
                        <FaSave />
                      )}
                    </button>
                  ) : (
                    <button
                      className="text-orange-400 px-2 py-1 hover:cursor-pointer rounded"
                      onClick={() =>
                        startEdit(user._id, user.username, user.email)
                      }
                    >
                      <FaEdit />
                    </button>
                  )}
                  {!user.isAdmin && (
                    <button
                      onClick={() => {
                        deleteHandler(user._id);
                      }}
                      className="text-red-500 px-2 py-1 hover:cursor-pointer rounded"
                    >
                      {deleteUserLoading ? (
                        <AiOutlineLoading className="animate-spin" />
                      ) : (
                        <FaTrash />
                      )}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
