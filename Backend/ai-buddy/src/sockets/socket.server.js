const { Server } = require("socket.io");
const agent = require("../agent/agent");

async function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://nike-4.netlify.app",
      ],
      credentials: true,
    },
  });

  // console.log("🔥 SOCKET.IO SERVER INITIALIZED");

  io.on("connection", (socket) => {
    // console.log("✅ USER CONNECTED:", socket.id);

    socket.on("message", async (data) => {
      // console.log("📩 MESSAGE FROM CLIENT:", data);

      try {
        const agentResponse = await agent.invoke({
          messages: [
            {
              role: "user",
              content: data,
            },
          ],
        });

        const lastMessage =
          agentResponse.messages[
            agentResponse.messages.length - 1
          ];

        // console.log("🤖 AI RESPONSE:", lastMessage.content);

        socket.emit("message", lastMessage.content);

      } catch (error) {
        console.error("❌ AI ERROR:", error);

        socket.emit(
          "message",
          "AI assistant me error aa gaya."
        );
      }
    });
  });
}

module.exports = { initSocketServer };