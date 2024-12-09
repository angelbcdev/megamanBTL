import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

import { config } from "dotenv"; // You can also use require("dotenv").

config();

const dev = process.env.local !== "production";
console.log("process.envd.HOSTNAME--d----", process.env.HOSTNAME);

const hostname = process.env.HOSTNAME;
const port = process.env.PORT || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

const allMessage = [];
app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on("message", (msg) => {
      allMessage.push(msg);

      io.emit("message", allMessage);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
