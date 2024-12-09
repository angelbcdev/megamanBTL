import { useEffect, useState } from "react";
import MyComponent from "../src/components/SocketComponent";


export default function Home() {
  const [userID, setUserID] = useState("");
  const [data, setData] = useState({});
  const [dataUser, setDataUser] = useState("");
  useEffect(() => {
    fetch("/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        token: "123",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data.id", data);
        setUserID(data.id);
      });
  }, []);

  const changeNewMessage = () => {
    fetch("/api", { method: "post", body: dataUser })
      .then((res) => res.json())
      .then((data) => setData(data));
  };
  return (
    <section>
      <div>
        <h1>hello world {userID}</h1>
        <input onChange={(e) => setDataUser(e.target.value)} type="text" />
        <button onClick={changeNewMessage}>enviar</button>
      </div>
      hello world{JSON.stringify(data)}
      <MyComponent />

    </section>
  );
}
