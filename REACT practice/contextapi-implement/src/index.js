import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ContextApiProvider from "./contextApi";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ContextApiProvider>
      <App />
    </ContextApiProvider>
  </StrictMode>
);
