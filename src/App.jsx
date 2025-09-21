import React from "react";
import Routes from "./Routes";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Routes />
      <Analytics />
    </>
  );
}

export default App;
