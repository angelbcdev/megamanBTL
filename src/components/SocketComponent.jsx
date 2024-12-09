"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const socket = io();

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [message, setMessage] = useState(["nada"]);
  const [sendMessage, setSendMessage] = useState("empty");
  const [userID, setUserID] = useState("");

  const sendHello = () => {
    socket.emit("message", sendMessage + " " + userID);
  };

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      setUserID(socket.id.slice(0, 5));

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("message", (msg) => {
      // Actualiza la interfaz de usuario con el nuevo mensaje

      setMessage(msg);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport user: {userID} </p>

      <input
        type="text"
        onChange={(e) => setSendMessage(e.target.value)}
        value={sendMessage}
        placeholder="Message"
      />

      <button onClick={sendHello}>Send Hello</button>
      <div>
        {message.map((msg) => (
          <p key={msg}>{msg}</p>
        ))}
      </div>
    </div>
  );
}
