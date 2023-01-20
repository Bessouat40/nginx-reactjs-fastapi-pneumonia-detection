import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import PredictionPage from './predictionPage';
import TitleComponent from './about';
import Data from './data';
import Home from './home';

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
      <Tabs value={value} onChange={handleChange} centered TabIndicatorProps={{
  sx: { backgroundColor: "#514d4c" }}} indicatorColor="#514d4c" textColor="#514d4c">
        <Tab label="Home" />
        <Tab label="Pneumonia Detection" />
        <Tab label="Database" />
        <Tab label="About" />
      </Tabs>
    </Grid>
      <Grid item>
        {value===0 && (<Home/>)}
        {value===1 && (<PredictionPage/>)}
        {value===2 && (<Data/>)}
        {value===3 && (<TitleComponent/>)}
      </Grid>
    </Grid>
    );
   };
   
export default FunctionalityChoice;