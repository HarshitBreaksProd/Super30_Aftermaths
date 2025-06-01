import { WebSocket, WebSocketServer } from "ws";
import prismaClient from "@repo/db/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "dotenv";
config();

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket: WebSocket, req: Request) => {
  const searchParams = new URLSearchParams(req.url.split("?")[1]);
  const token = searchParams.get("token");

  if (!token) {
    console.log("Token not found");
    socket.send(JSON.stringify({ type: "error", message: "Token not found" }));
    socket.close();
    return;
  }

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || "kjhytfrde45678iuytrfdcfgy6tr"
    ) as JwtPayload;

    if (!verified?.id) {
      console.log("User not authorised");
      socket.send(
        JSON.stringify({ type: "error", message: "User not authorised" })
      );
      socket.close();
      return;
    }

    const userFound = prismaClient.user.findFirst({
      where: { id: verified.id },
    });

    if (!userFound) {
      console.log("User does not exist");
      socket.send(
        JSON.stringify({ type: "error", message: "User does not exist" })
      );
      socket.close();
      return;
    }
  } catch (e) {
    console.log(e);
    console.log("Error verifying user");
    socket.send(
      JSON.stringify({ type: "error", message: "Error verifying user" })
    );
    socket.close();
    return;
  }

  socket.on("message", (data) => {
    socket.send(data.toString());
  });
});
