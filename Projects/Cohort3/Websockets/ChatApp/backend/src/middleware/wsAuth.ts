import { WebSocket } from "ws";
import jwt from "jsonwebtoken";
import { IncomingMessage } from "http";

export const verifyWebSocketConnection = async (
  socket: WebSocket,
  req: IncomingMessage
) => {
  try {
    // Get token from query parameters
    const token = req.url?.split("?token=")[1];

    if (!token) {
      socket.close(1008, "Authentication required");
      return false;
    }

    // Verify the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    if (!decoded) {
      socket.close(1008, "Invalid token");
      return false;
    }

    // Attach user info to socket for later use
    (socket as any).user = decoded;
    return true;
  } catch (error) {
    socket.close(1008, "Authentication failed");
    return false;
  }
};
 