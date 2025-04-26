import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";

// Add a class to indicate JavaScript is enabled
document.documentElement.classList.add('js-enabled');

// Preload the theme from localStorage to prevent theme flashing during page transitions
const theme = localStorage.getItem("vite-ui-theme") || "dark";
document.documentElement.classList.add(theme);

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster />
  </>
);
