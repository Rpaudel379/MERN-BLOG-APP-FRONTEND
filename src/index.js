import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BlogProvider } from "./context/BlogContext";
import { AppProvider } from "./context/context";

ReactDOM.render(
  <AppProvider>
    <BlogProvider>
      <App />
    </BlogProvider>
  </AppProvider>,
  document.getElementById("root")
);
  