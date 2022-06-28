import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <ModalsProvider>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);
