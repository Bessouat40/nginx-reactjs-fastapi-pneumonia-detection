import React from "react";
import Brain from "./brain_.png";
import AppBar from "@mui/material/AppBar";
import Perfs from "./perf.png";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from '@mui/material/Link';

const TitleComponent = () => {
  return (
    <Grid container spacing={3} justifyContent='center'>
      <Grid item>
    <AppBar position="relative" color="inherit">
      <Grid container 
      justifyContent="center"
      alignItems="center" 
      direction='row'>
      <img
        src={Brain}
        style={{
          width: 240,
          height: 170,
          marginLeft: "1.5rem",
          position: "absolut",
        }}
        alt="logo"
      />
      <Typography variant="h1">Pathology Detection</Typography>
          </Grid>
    </AppBar>
    </Grid>
    <Grid item>
    <Grid item justifyContent='center'>
    <Typography justifyContent='center'>
      Projet réalisé par Roman Bessouat. 
      Le modèle de prédiction est un modèle de Random Forest ayant une accuracy d'environ 94%.
    </Typography>
    <Typography justifyContent='center'>
    </Typography>
    <Typography>L'objectif est de mettre en place un logiciel permettant la détection d'une pneumonie à partir de l'image d'une radiographie du thorax.</Typography>
    <img src={Perfs}
    style={{ width: 400, height: 250 }}
    alt="perfs random forest"
    />
    </Grid>
    <Grid item>
    <Link href='https://github.com/Bessouat40' target='_blank'>Mon github</Link>
    </Grid>
    <Grid item>
    <Link href='https://www.linkedin.com/in/roman-bessouat-03a15618b/' target="_blank">Mon linkedin</Link>
    </Grid>
    <Grid item>
    <Link href='https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia' target="_blank">Des images de radiographies du thorax sont téléchargeables ici</Link>
    </Grid>
    </Grid>
    </Grid>
  );
};

export default TitleComponent;
