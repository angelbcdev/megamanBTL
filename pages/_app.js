import { useEffect } from "react";
import { io } from "socket.io-client";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const socket = io();

    socket.on("chat message", (msg) => {
      // Actualiza la interfaz de usuario con el nuevo mensaje
      console.log(msg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
