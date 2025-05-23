"use client";
import axios from "axios";
import { useState } from "react";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await axios.post("http://localhost:3000/api/v1/auth/signup", {
      username,
      password,
    });

    console.log(res);
  };

  return (
    <div>
      <input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        value={username}
      />
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />
      <button onClick={submit}>Submit</button>
    </div>
  );
}
