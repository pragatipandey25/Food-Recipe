import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./ThemeContext";
import { AuthProvider } from "./AuthContext";
import LoginPrompt from "./components/LoginPrompt";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App />
        <LoginPrompt />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
