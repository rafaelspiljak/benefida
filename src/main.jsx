import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const container = document.getElementById("form-adhd-widget");

// ✅ Prevent duplicate mounting
if (container && !container.hasAttribute("data-mounted")) {
  container.setAttribute("data-mounted", "true");
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
