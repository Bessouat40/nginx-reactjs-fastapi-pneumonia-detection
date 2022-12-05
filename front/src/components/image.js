import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import FormData from "form-data";

import DeleteIcon from "@mui/icons-material/Delete";

const UploadImg = () => {
  const [selected, setSelected] = useState();
  const [preview, setPreview] = useState();
  const [predict, setPredict] = useState();

  useEffect(() => {}, [preview]);

  const onUpload = (event) => {
    console.log(event.target.files)
    setSelected(event.target.files[0]);
    setPreview(URL.createObjectURL(event.target.files[0]));
    setPredict();
  };

  const onPredict = async () => {
    if (!selected) {
      alert("Veuillez uploader une image pour lancer la prédiction");
    } else {
      const formData = new FormData();
      formData.append("image", selected);
      const resp = await fetch("http://localhost:8000/prediction_single_pneumonia", {
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
          <input hidden type="file" onChange={onUpload} />
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
        <img
          src={preview}
          style={{ width: 325, height: 350 }}
          alt="img to predict"
        />
      ) : (
        <Typography variant="h5">Sélectionnez une image</Typography>
      )}
      {predict ? <Typography variant="h5">{predict}</Typography> : <div></div>}
    </Stack>
  );
};

export default UploadImg;
