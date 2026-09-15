import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../service/socket";
import { addMessage } from "../feature/chat/chatSlice";
import Aibuddy from "../assets/ai-assitant.png"

import "../style/chatAssistant.css";

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const messages = useSelector(
    (state) => state.chat.messages
  );

  useEffect(() => {
    const handleMessage = (msg) => {
      dispatch(
        addMessage({
          role: "assistant",
          content: msg,
        })
      );
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [dispatch]);

  const sendMessage = () => {
    if (!input.trim()) return;

    dispatch(
      addMessage({
        role: "user",
        content: input,
      })
    );

    socket.emit("message", input);

    setInput("");
  };

  return (
    <>
      {/* AI FLOATING IMAGE */}
      {!isOpen && (
        <button
          className="ai-assistant-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
        >
          <img
            src={Aibuddy}
            alt="AI Assistant"
          />
        </button>
      )}

      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="ai-chat-window">

          {/* HEADER */}
          <div className="ai-chat-header">
            <div className="ai-title">
              <img
                src={Aibuddy}
                alt="AI"
              />

              <div>
                <h3>AI Assistant</h3>
                <span>Online</span>
              </div>
            </div>

            <button
              className="ai-close"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          {/* MESSAGES */}
          <div className="chat-messages">

            {messages.length === 0 && (
              <div className="ai-welcome">
                <img
                  src={Aibuddy}
                  alt="AI"
                />

                <h3>Hi 👋</h3>

                <p>
                  How can I help you?
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-bubble ${msg.role}`}
              >
                {msg.content}
              </div>
            ))}

          </div>

          {/* INPUT */}
          <div className="chat-input">

            <input
              type="text"
              placeholder="Ask AI to add product..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button onClick={sendMessage}>
              Send
            </button>

          </div>

        </div>
      )}
    </>
  );
}