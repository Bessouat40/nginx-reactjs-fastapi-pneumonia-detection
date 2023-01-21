import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Dropzone from "./subcomponents/dropzone";
import Images from "./subcomponents/images";
import Tables from "./subcomponents/tables";


import FormData from "form-data";

const PredictionPage = () => {
  const [selected, setSelected] = useState();
  const [images, setImages] = useState();
  const [predict, setPredict] = useState();
  const [rows, setRows] = useState();
  const [csvData, setData] = useState();
  const [pastilles, setPastilles] = useState();
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
  }, []);

  /**
   * Receive upload files and store them into variables
   * Setup parameters with default values
   * @param {} files files to send to backend for diagnostic generation
   */
  const onUpload = (files) => {
    setPredict();
    const reception = [];
    const radios = [];
    const listeImages = [];
    const pastille = [];
    reception.push(files);
    for (let i = 0; i < reception[0].length; i++) {
        radios.push({img: URL.createObjectURL(reception[0][i]), filename: reception[0][i].name.split('.').shift()})
        listeImages.push(reception[0][i])
        pastille.push('inherit')
    }
    setSelected(radios)
    setPastilles(pastille)
    setImages(listeImages);
  };

  const createData = (filename, pred) => {
    return {filename, pred};
  }

  /**
   * Send data to backend for diagnostic
   * @returns response from backend
   */
  const sendFormData = async () => {
    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));
    const resp = await fetch('/api/prediction_multiple_pneumonia', {
      body: formData,
      method: "POST",
    });
    return resp;
  }

  /**
   * 
   * @param {List} data response from the backend : images diagnostic
   */
  const storeData = (data) => {
    const row = [];
    const csv_datas = [["Filenames", "Predictions"]];
    let diagnostic = ''
    const pastille = []
    data.forEach((d, idx) => {
      if (d === 1) {diagnostic = 'pneumonia'; pastille.push('error')}
      else {diagnostic = 'normal'; pastille.push('success')}
      row.push(createData(selected[idx]['filename'], diagnostic))
      csv_datas.push([selected[idx]['filename'], diagnostic])
    })  
    return [row, csv_datas, pastille]
  }

  /**
   * Send data to backend for diagnostic and display/store results
   */
  const onPredict = async () => {
    if (!selected) {
      alert("Please upload image(s) to launch prediction");
    } else {
      const resp = await sendFormData();
      const data = await resp.json();
      const [row, csv_datas, pastille] = storeData(data)    
      setRows(row)
      setData(csv_datas)
      setPastilles(pastille)
      setPredict(data);
      setRerender(!rerender)
    }
  };


  const onDelete = () => {
    setPredict();
    setSelected();
  };

  const sendStoreData = () => {
    const formData = new FormData();
    csvData.forEach((data) => formData.append("data", JSON.stringify(data)));
    fetch('/api/add_data', {
      body: formData,
      method: "POST",
    });
  }

  const onStore = () => {
    sendStoreData();
    alert("Data succesfully stored")
  }

  return (
    <Stack style={{minHeight:"100vh", overflow:'hidden',
    alignItems: 'center',
    marginBottom:20
  }}>
    <Stack spacing={5} alignItems="center" 
    style={{
    maxWidth:"90%", 
    borderRadius:"10px"}} sx={{border:15, borderColor:"#FFFFFF", backgroundColor:"#FFFFFF"}}>
      <Stack spacing={30} direction="row" alignItems="center"
      >
        <Stack direction="row" spacing={2}>
          <Button variant="contained" style={{backgroundColor:"#740d10"}} onClick={onPredict}>
            Predict
          </Button>
          <IconButton aria-label="delete" onClick={onDelete} style={{color:'#740d10'}}>
            <DeleteIcon/>
          </IconButton>
        </Stack>
      </Stack>
      {selected ? (
        <Images selected={selected} pastilles={pastilles}/>
        ) : (
          <Dropzone onDrop={onUpload} text={'upload your image'}/>
        )}
      {predict ? 
      <Stack direction="row" spacing={2}>
      <Button variant="contained" style={{backgroundColor:"#740d10", height:40}} onClick={onStore}>
        Store Data
      </Button>
      <Tables rows={rows} csvData={csvData}/>
    </Stack>
       : <div></div>}
    </Stack>
    </Stack>
  );
};

export default PredictionPage;