import "./App.css";
import { useState, useEffect } from "react";
import FileUpload from "./components/FileUpload";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8080');

    const handleTodosChange = (event) => {
      const data = event.data
      console.log("data:" , data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    eventSource.addEventListener('todos_change', (event) => {
      const newTodo = JSON.parse(event.data);
      console.log("todo:", newTodo);
    });

    eventSource.onmessage = (event) => {
      handleTodosChange(event)
    }

    return () => {
      eventSource.removeEventListener('todos_change', handleTodosChange);
      eventSource.close();
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
