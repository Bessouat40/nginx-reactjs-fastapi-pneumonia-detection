import React from "react";
import Brain from "./images/brain_.png";
import AppBar from "@mui/material/AppBar";
import Perfs from "./images/perf.png";
import Linkedin from "./images/linkedin.png"
import Github from "./images/github.png"
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack"
import Link from '@mui/material/Link';

const TitleComponent = () => {
  return (
    <Stack spacing={1.5} alignItems='center' >
    <AppBar position="relative" color="inherit">
      <Stack 
      justifyContent="center"
      alignItems="center" 
      direction='row'>
      <img
        src={Brain}
        style={{
          width: 250,
          height: 170,
          marginLeft: "1.5rem",
          position: "absolut",
        }}
        alt="logo"
      />
      <Typography variant="h1">PneumonIA</Typography>
          </Stack>
    </AppBar>
        <Stack alignItems='center' spacing={1}>
    <Stack>
    <Typography justifyContent='center'>
      Project realised by Roman Bessouat (Former ESIEE Paris Student).
      Prediction model is a Random Forest with 94% accuracy.
    </Typography>
    <Typography justifyContent='center'>
    </Typography>
    <Typography>The goal is to develop a software for pneumonia detection with a thorax radiography.</Typography>
    </Stack>
    <img src={Perfs}
    style={{ width: 400, height: 250 }}
    alt="perfs random forest"
    />
    <Stack alignItems='center' direction="row" spacing={3}>
    <Link href='https://github.com/Bessouat40' target='_blank' underline='hover'>
    <Stack alignItems='center' direction="row">
    <img
        src={Github}
        style={{
          width: 35,
          height: 35,
          marginLeft: "1.5rem",
          position: "absolut",
        }}
        alt="logo"
      />
        My github
        </Stack>
        </Link>
        <Link href='https://www.linkedin.com/in/roman-bessouat-03a15618b/' target='_blank' underline='hover'>
    <Stack alignItems='center' direction="row">
    <img
        src={Linkedin}
        style={{
          width: 30,
          height: 30,
          marginLeft: "1.5rem",
          position: "absolut",
        }}
        alt="logo"
      />
        My Linkedin
        </Stack>
        </Link>
    </Stack>
    <Link href='https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia' target="_blank" underline='hover'>You can download thorax radiography here</Link>
    </Stack>
    </Stack>
  );
};

export default TitleComponent;
