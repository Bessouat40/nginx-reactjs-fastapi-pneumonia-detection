import React from "react";
import ReactDOM from "react-dom/client";
import {Stack } from "@mui/material";
import App from "./components/App";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Stack spacing={3} 
    sx={{background:"linear-gradient(39deg, rgba(210,191,195,1) 0%, rgba(170,70,86,1) 50%, rgba(116,13,16,1) 100%)",
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    margin: 0,
    marginBottom: 2,
    padding: 0
    }}
    >
      <App />
    </Stack>
);
