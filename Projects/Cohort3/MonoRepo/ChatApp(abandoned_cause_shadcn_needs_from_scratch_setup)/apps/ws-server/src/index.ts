import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 }, () => {
  console.log(`WebSocket listening on port: 8080`);
});

wss.on("connection", async (socket: WebSocket) => {
  socket.on("message", (data) => {
    socket.send(data.toString());
  });
});
