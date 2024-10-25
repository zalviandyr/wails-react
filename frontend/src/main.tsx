import "./assets/style.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { Home } from "./pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const container = document.getElementById("root");

const root = createRoot(container!);
// Create a client
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className="bg-black min-h-screen bg-opacity-60 p-8">
        <Home />
      </div>
    </QueryClientProvider>
  </React.StrictMode>
);
