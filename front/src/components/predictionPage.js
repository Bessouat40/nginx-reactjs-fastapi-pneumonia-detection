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
      alert("Veuillez uploader une image pour lancer la prédiction");
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

  return (
    <Stack spacing={5} alignItems="center">
      <Stack spacing={30} direction="row" alignItems="center">
        <Stack direction="row" spacing={2}>
          <Button variant="contained" style={{backgroundColor:"#514d4c"}} onClick={onPredict}>
            Predict
          </Button>
          <IconButton aria-label="delete" onClick={onDelete}>
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
      <Tables rows={rows} csvData={csvData}/> : <div></div>}
    </Stack>
  );
};

export default PredictionPage;
