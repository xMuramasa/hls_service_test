import React from "react";

import UserInterface from "./components/UserInterface";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UserInterface />
    </main>
  );
}
