import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import FunctionalityChoice from './components/tab';
import {Grid } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode >
    <div 
    // style={{
    //     backgroundColor: '#200904',
    //     margin: 0,
    //     padding: 0,
    //     position: "absolute",
    //     top: 0,
    //     right: 0,
    //     bottom: 0,
    //     left: 0,
    //     margin: 0,
    //     padding: 0
    //   }}
    
      >
    <Grid
      spacing={3} 
    >
      <FunctionalityChoice />
    </Grid>
    </div>
  </React.StrictMode>
);

reportWebVitals();
