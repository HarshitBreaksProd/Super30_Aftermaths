import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

async function fetchUser() {
  const user = await prismaClient.user.findFirst({});
  return user;
}

export default async function Page() {
  const user = await fetchUser();

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded">
          <div>Name: {user?.username}</div>

          {user?.password}
        </div>
      </div>
    </div>
  );
}
