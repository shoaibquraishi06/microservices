import { io } from "socket.io-client";

const socket = io("https://microservices-1-98rk.onrender.com/", {
  transports: ["polling", "websocket"],
});

socket.on("connect", () => {
  // console.log("✅ SOCKET CONNECTED:", socket.id);
});

socket.on("connect_error", (error) => {
  // console.error("❌ SOCKET CONNECTION ERROR:", error.message);
});

socket.on("disconnect", (reason) => {
  // console.log("❌ SOCKET DISCONNECTED:", reason);
});

export default socket;