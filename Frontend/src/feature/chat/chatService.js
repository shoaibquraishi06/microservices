import socket from "../../services/socket";

export const sendMessageToAI = (message) => {
  socket.emit("message", message);
};

export const listenToAI = (callback) => {
  socket.on("message", callback);
};

export const removeListener = () => {
  socket.off("message");
};