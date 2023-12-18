import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chart from 'react-apexcharts';

const Home = () => {
  const [datas, setData] = useState();

  useEffect(() => {
    const sendFetchData = async () => {
      const resp = await fetch('/api/require', {
        method: 'POST',
      });
      const data = await resp.json();
      return data;
    };

    /**
     * Receive data to display
     */
    const initData = async () => {
      const data = await sendFetchData();
      let pneumo = 0;
      let norm = 0;
      data.forEach((d) => {
        if (d[1] === 'pneumonia') pneumo++;
        else norm++;
      });
      setData([norm, pneumo]);
    };

    initData();
  }, []);

  return (
    <Stack
      sx={{
        minHeight: '100vh',
        overflow: 'hidden',
        alignItems: 'center',
        marginBottom: 20,
      }}
    >
      <AppBar
        position="relative"
        color="inherit"
        sx={{
          width: '60%',
          borderRadius: '10px',
          backgroundColor: 'rgb(249,249,249,0.8)',
        }}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="row"
          spacing={5}
        >
          <Typography
            variant="h1"
            style={{
              background: 'black',
              webkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'skia',
            }}
          >
            PneumonIA
          </Typography>
        </Stack>
      </AppBar>
      <Stack
        spacing={5}
        alignItems="center"
        sx={{
          marginTop: '2%',
          width: '90%',
          maxHeight: '90%',
          borderRadius: '10px',
          borderColor: 'rgb(249,249,249,0.8)',
          backgroundColor: 'rgb(249,249,249,0.8)',
        }}
      >
        <Stack alignItems="center" spacing={7}>
          <Typography
            variant="h2"
            style={{
              background: 'black',
              webkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'skia',
            }}
          >
            Database Informations :
          </Typography>
          {datas ? (
            <Chart
              options={{
                chart: {
                  id: 'basic-bar',
                },
                xaxis: {
                  categories: ['NORMAL', 'PNEUMONIA'],
                },
              }}
              series={[
                {
                  name: 'Database',
                  data: datas,
                },
              ]}
              type="bar"
              width="500"
            />
          ) : (
            <div></div>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Home;
