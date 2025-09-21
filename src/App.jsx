import React from "react";
import Routes from "./Routes";
import { Analytics } from "@vercel/analytics/next";

function App() {
  return (
    <>
      <Routes />
      <Analytics />
    </>
  );
}

export default App;
