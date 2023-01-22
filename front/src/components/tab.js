import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PredictionPage from './predictionPage';
import TitleComponent from './about';
import Data from './data';
import Home from './home';
import { Stack } from '@mui/system';

const FunctionalityChoice = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

    return (
        <Stack  
        direction='column'
        spacing={3}
        >
    <Stack>
      <Tabs value={value} onChange={handleChange} centered TabIndicatorProps={{
  sx: { backgroundColor: "#FFFFFF" }}} indicatorColor="#FFFFFF" textColor="#FFFFFF">
        <Tab label="Home" style={{fontFamily:"skia", color:'white'}}/>
        <Tab label="Pneumonia Detection" style={{fontFamily:"skia", color:'white'}}/>
        <Tab label="Database" style={{fontFamily:"skia", color:'white'}}/>
        <Tab label="About" style={{fontFamily:"skia", color:'white'}}/>
      </Tabs>
    </Stack>
      <Stack>
        {value===0 && (<Home/>)}
        {value===1 && (<PredictionPage/>)}
        {value===2 && (<Data/>)}
        {value===3 && (<TitleComponent/>)}
      </Stack>
    </Stack>
    );
   };
   
export default FunctionalityChoice;