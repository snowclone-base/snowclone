import "./App.css";
import { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const client = new WebSocket("ws://localhost:8080");
    client.onmessage = (event) => {
      const message = event.data;
      setMessages((prev) => [...prev, message]);
    };

    return () => {
      client.close();
    };
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <FileUpload />
    </div>
  );
}

export default App;
