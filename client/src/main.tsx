import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.tsx";
import "./index.css";
//! useing react redux
import { store } from "@/store";
import { Provider } from "react-redux";

//! useing react-query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

//! useing react-hot-toast
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
