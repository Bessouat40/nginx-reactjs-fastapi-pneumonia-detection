import React, { useState, useEffect } from "react";
import Brain from "./images/brain_.png";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack"
import Chart from "react-apexcharts";


const Home = () => {

    const [datas, setData] = useState();

    useEffect(() => {
        const sendFetchData = async () => {
            const resp = await fetch('/api/require', {
                method: "POST",
                });
            const data = await resp.json();
            return data
            }
    
        /**
        * Receive data to display
        */
        const initData = async () => {
            const data = await sendFetchData()
            let pneumo = 0;
            let norm = 0;
            data.forEach((d) => {
                if (d[1] === 'pneumonia') pneumo++
                else norm++
              })  
            setData([norm, pneumo])
          }

        initData();
    }, []);

    return (
        <Stack spacing={5} alignItems='center' >
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
            <Stack alignItems='center' spacing={7}>
            <Typography variant="h2">Database Informations :</Typography>
            {datas ? (<Chart
                options={{
                    chart: {
                    id: "basic-bar"
                    },
                    xaxis: {
                    categories: ['NORMAL', 'PNEUMONIA']
                    }
                }}
                series={[
                    {
                    name: "Database",
                    data: datas
                    }
                ]}
                type="bar"
                width="500"
                />) :
                (<div></div>)}
        </Stack>
        </Stack>
    );
    };

export default Home;
