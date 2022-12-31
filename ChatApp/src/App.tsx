import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Lobby from "./components/Lobby";
import { ServerMessage } from "./interface";

const App = () => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<ServerMessage[]>([]);
  const [users, setUsers] = useState<string[]>([]);

  const joinRoom = async (user: string, room: string) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7214/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("UsersInRoom", (users: string[]) => {
        setUsers(users);
      });

      connection.on("ReceiveMessage", (user: string, message: string) => {
        setMessages((messages) => [...messages, { user, message }]);
      });

      connection.onclose((e) => {
        setConnection(null);
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });

      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (message: string) => {
    try {
      await connection?.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      await connection?.stop();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="app">
      <h2>My Chat</h2>
      <hr className="line" />
      {connection ? (
        <Chat
          messages={messages}
          users={users}
          sendMessage={sendMessage}
          closeConnection={closeConnection}
        />
      ) : (
        <Lobby joinRoom={joinRoom} />
      )}
    </div>
  );
};

export default App;
