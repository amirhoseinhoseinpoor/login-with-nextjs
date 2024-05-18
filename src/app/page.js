import Image from "next/image";
import React from 'react';
import LoginForm from "./login";
export default function Home() {
  return (
    <main className="h-100">
      <React.StrictMode>
        <LoginForm/>
      </React.StrictMode>
    </main>
  );
}
