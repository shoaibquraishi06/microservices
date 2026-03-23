import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../services/socket";
import { addMessage } from "../features/chat/chatSlice";
import { getCartAPI } from "../features/cart/cartThunk";
import "../style/chatassistant.css";

export default function ChatAssistant() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector(state => state.chat.messages);

  useEffect(() => {
    socket.on("message", (msg) => {
      dispatch(addMessage({ role: "assistant", content: msg }));
      dispatch(getCartAPI()); // refresh cart after AI action
    });

    return () => socket.off("message");
  }, [dispatch]);

  const sendMessage = () => {
    if (!input.trim()) return;

    dispatch(addMessage({ role: "user", content: input }));
    socket.emit("message", input);
    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask AI to add product..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}