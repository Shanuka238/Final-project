import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from './contexts/AuthContext';
import "./styles/tailwind.css";
import "./styles/index.css";
// ...removed ClerkProvider import...


const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
