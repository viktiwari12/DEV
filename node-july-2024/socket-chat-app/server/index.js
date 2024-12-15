const http = require("http");
const { Server } = require("socket.io");

const socketstore = {};

function init() {
  try {
    const httpServer = http.createServer();

    const io = new Server(httpServer, {
      cors: "*",
    });

    io.on("connection", (socket) => {
      console.log(`Socket Connected`, socket.id);

      socketstore[req.user._id] = socket.id;

      socket.on("join-room", ({ roomId }) => {
        // DB - If this socket has permission to join this room or not
        socket.join(roomId);
      });

      socket.on("chat-message", ({ data, roomId }) => {
        console.log(data);

        // Broadcast - Send to every connected socket
        io.emit("incomming-message", { data });

        // Broadcast in this room
        io.to(roomId).emit("");

        //
        io.to(socket.id).emit();
      });

      socket.on("disconnect", () => {
        console.log(`Disconnected`, socket.id);
      });
    });

    httpServer.listen(8000, () =>
      console.log(`http server is running on PORT 8000`)
    );
  } catch (err) {
    console.log(`Error Starting Server`, err);
  }
}

init();
