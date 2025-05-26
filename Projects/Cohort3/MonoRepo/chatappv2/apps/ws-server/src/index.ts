import { WebSocket, WebSocketServer } from "ws";
import { config } from "dotenv";
import prismaClient from "@workspace/db/client";

config();

interface WSConnection {
  socket: WebSocket;
  userId: string;
}

interface Message {
  type?: string;
  content: string;
  userId: string;
  user?: { id: string; username: string };
  roomId: string;
  createdAt: string;
}

const wss = new WebSocketServer(
  {
    port: parseInt(process.env.WS_PORT || "8080"),
  },
  () => {
    console.log(`WebSocket listening on port: ${process.env.WS_PORT}`);
  }
);

const activeConnections = new Map<string, WSConnection[]>();

wss.on("connection", async (socket, req) => {
  try {
    let roomId = "";
    let userId = "";
    socket.on("message", async (data) => {
      const recievedData: Message = JSON.parse(data.toString());
      if (recievedData.type === "join") {
        roomId = recievedData.roomId;
        userId = recievedData.userId;

        activeConnections.set(roomId, [
          ...(activeConnections.get(roomId) || []),
          { socket, userId: userId },
        ]);
        return;
      }

      const connections = activeConnections.get(roomId);
      if (connections) {
        try {
          const message = await prismaClient.message.create({
            data: {
              content: recievedData.content,
              userId: parseInt(userId),
              roomId: parseInt(roomId),
            },
            select: {
              user: true,
              roomId: true,
              content: true,
              userId: true,
              createdAt: true,
            },
          });
          connections.forEach((connection) => {
            connection.socket.send(JSON.stringify(message));
          });
        } catch (e) {
          console.log(e);
        }
      }
    });

    socket.on("close", () => {
      const connections = activeConnections.get(roomId);
      if (connections) {
        const updatedConnections = connections.filter(
          (connection) => connection.socket !== socket
        );
        if (updatedConnections.length === 0) {
          activeConnections.delete(roomId);
        } else {
          activeConnections.set(roomId, updatedConnections);
        }
      }
    });
  } catch (error) {
    socket.close(1008, "Authentication failed");
  }
});
