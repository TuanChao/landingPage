import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { LayoutChromeProvider } from "./contexts/LayoutChrome";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <LayoutChromeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LayoutChromeProvider>
    </LanguageProvider>
  </React.StrictMode>
);
