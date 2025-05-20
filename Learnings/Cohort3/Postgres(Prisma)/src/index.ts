import { PrismaClient } from "./generated/prisma";
const client = new PrismaClient();

const createUser = async () => {
  try {
    await client.user.update({
      where: {
        id:1
      },
      data: {
        username: "Harshit",
      },
    });
  } catch (e) {
    console.log(e);
  }
};
