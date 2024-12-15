import { useEffect, useState } from "react";
import { socket } from "./socket";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  function sendMessage() {
    socket.emit("chat-message", { data: message });
    setMessage("");
  }

  function handleOnIncommingMessage({ data }) {
    setMessages((prev) => [...prev, data]);
  }

  useEffect(() => {
    socket.on("incomming-message", handleOnIncommingMessage);

    return () => {
      socket.off("incomming-message", handleOnIncommingMessage);
    };
  }, []);

  return (
    <div className="container">
      <div>
        <div className="messages">
          {messages.map((message) => (
            <div key={message} className="message">
              <p>{message}</p>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
