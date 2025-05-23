import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prismaClient = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.json();

  await prismaClient.user.create({
    data: {
      username: data.username,
      password: data.password,
    },
  });

  return NextResponse.json({ message: "Signed Up" });
}
