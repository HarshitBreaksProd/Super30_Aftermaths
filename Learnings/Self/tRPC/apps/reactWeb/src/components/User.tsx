import { useMutation, useQuery } from "@tanstack/react-query";
import { trpc } from "../utils/trpc";

const User = () => {
  const user = useQuery(trpc.user.getUser.queryOptions({ id: "test" })); // send get req to http://localhost:3000/api/v1/user/getUser?id=test
  const userCreate = useMutation(trpc.user.createUser.mutationOptions());

  return (
    <div>
      {user.data?.id} --- {user.data?.name} --- User
      <br />
      <button
        onClick={async () => {
          const res1 = userCreate.mutate({
            name: "Harshit",
            email: "test@gmail.com",
          });
          console.log(res1); // this will always be void/undefined
          const res2 = await userCreate.mutateAsync({
            name: "Harshit",
            email: "test@gmail.com",
          });
          console.log(res2); // this will have the returned data
        }}
      >
        {userCreate.isPending
          ? "Loading..."
          : userCreate.isError
            ? "Error..."
            : "Create"}
      </button>
      <br />
      <p>{userCreate.isSuccess && JSON.stringify(userCreate.data)}</p>
    </div>
  );
};

export default User;
