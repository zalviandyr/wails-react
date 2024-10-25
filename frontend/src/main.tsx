import "./assets/style.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { Home } from "./pages/Home";

const container = document.getElementById("root");

const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <div className="bg-black min-h-screen bg-opacity-60 p-8">
      <Home />
    </div>
  </React.StrictMode>
);
