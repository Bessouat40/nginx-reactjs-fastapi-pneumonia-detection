import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import FunctionalityChoice from './components/tab';
import {Stack } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode >
    <div>
    <Stack spacing={3} 
    >
      <FunctionalityChoice />
    </Stack>
    </div>
  </React.StrictMode>
);

reportWebVitals();
