import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem"
import ImageListItemBar from "@mui/material/ImageListItemBar";

import _ from 'lodash'

import FormData from "form-data";

const UploadImgs = () => {
  const [selected, setSelected] = useState();
  const [images, setImages] = useState();
  const [preview, setPreview] = useState();
  const [predict, setPredict] = useState();
  const [filenames, setFilenames] = useState();

  useEffect(() => {}, [preview]);

  const onUpload = (event) => {
    setPredict();
    const reception = [];
    const radios = [];
    const listeImages = [];
    reception.push(event.target.files);
    for (let i = 0; i < reception[0].length; i++) {
        radios.push({img: URL.createObjectURL(reception[0][i]), filename: reception[0][i].name.split('.').shift()})
        listeImages.push(reception[0][i])
    }
    setSelected(radios)
    setImages(listeImages);
  };

  const onPredict = async () => {
    if (!selected) {
      alert("Veuillez uploader une image pour lancer la prédiction");
    } else {
      const formData = new FormData();
      formData.append('images', images)
      const resp = await fetch("http://localhost:8000/prediction_multiple_pneumonia", {
        body: formData,
        method: "POST",
      });
      const data = await resp.json();
      setPredict(data);
    }
  };


  const onDelete = () => {
    setPredict();
    setPreview();
    setSelected();
  };

  return (
    <Stack spacing={5} alignItems="center">
      <Stack spacing={30} direction="row" alignItems="center">
        <Button
          color="primary"
          aria-label="upload-picture"
          component="label"
          endIcon={<FileUploadIcon />}
          variant="contained"
        >
          Upload image
          <input hidden type="file" onChange={onUpload} multiple />
        </Button>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={onPredict}>
            Predict
          </Button>
          <IconButton aria-label="delete" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Stack>
      {selected ? (
        <ImageList cols={5}>
        {(selected || []).map((url, idx) => (
        <ImageListItem key={url.filename}>
        <img src={url.img} alt={url.filename} style={{ width: 250, height: 250}} />
        <ImageListItemBar title={url.filename} />
        </ImageListItem>
        ))}
        </ImageList>
        ) : (
        <Typography variant="h5">Sélectionnez une image</Typography>
        )}
      {predict ? <Typography variant="h5">{predict}</Typography> : <div></div>}
    </Stack>
  );
};

export default UploadImgs;
