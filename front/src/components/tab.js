import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import UploadImg from './image';
import UploadMultipleImage from './multipleImages';
import TitleComponent from './home';

const FunctionalityChoice = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

    return (
        <Grid 
        container 
        direction='column'
        spacing={3}>
    <Grid item>
      <Tabs value={value} onChange={handleChange} centered >
        <Tab label="Accueil" />
        <Tab label="Prédiction sur une simple image" />
        <Tab label="Prédiction sur un dossier d'images" />
      </Tabs>
    </Grid>
      <Grid item>
        {value===0 && (<TitleComponent/>)}
        {value===1 && (<UploadImg/>)}
        {value===2 && (<UploadMultipleImage/>)}
      </Grid>
    </Grid>
    );
   };
   
export default FunctionalityChoice;