import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

import ConetextApiProvider from "./components/ContextApi";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ConetextApiProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConetextApiProvider>
  </StrictMode>
);
