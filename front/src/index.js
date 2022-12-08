import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import FunctionalityChoice from './components/tab';
import {Grid } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode >
    <div>
    <Grid
      spacing={3} 
    >
      <FunctionalityChoice />
    </Grid>
    </div>
  </React.StrictMode>
);

reportWebVitals();
