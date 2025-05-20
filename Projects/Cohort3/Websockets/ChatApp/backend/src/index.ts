import { WebSocket, WebSocketServer } from "ws";
import express from "express";
import { connectDb } from "./db";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes";
import roomRouter from "./routes/roomRoutes";
import messageRouter from "./routes/messageRoutes";
import { configDotenv } from "dotenv";
import { authenticateUser } from "./middleware";
import jwt from "jsonwebtoken";

configDotenv();
connectDb();
const app = express();

interface WSConnection {
  socket: WebSocket;
  userId: string;
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
    const url = new URL(req.url!, `ws://${req.headers.host}`);
    const token = url.searchParams.get("token");
    if (!token) {
      socket.close(1008, "Missing token");
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      roomId: string;
    };

    const roomId = decoded.roomId;
    activeConnections.set(roomId, [
      ...(activeConnections.get(roomId) || []),
      { socket, userId: decoded.userId },
    ]);

    socket.on("message", (data) => {
      const recievedData = JSON.parse(data.toString());
      const { roomId, userId, message } = recievedData;

      const connections = activeConnections.get(roomId);
      if (connections) {
        connections.forEach((connection) => {
          connection.socket.send(data.toString());
        });
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

app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/room", authenticateUser, roomRouter);
app.use("/api/v1/message", authenticateUser, messageRouter);

app.listen(process.env.HTTP_PORT, () => {
  console.log(`Listening on port: ${process.env.HTTP_PORT}`);
});
