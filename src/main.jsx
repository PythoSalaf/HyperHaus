import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import { PrivyProvider } from "@privy-io/react-auth";
import { store } from "./Store/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PrivyProvider appId="cmegit35h00ihju0bqpgz6hk6">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PrivyProvider>
    </Provider>
  </StrictMode>
);
