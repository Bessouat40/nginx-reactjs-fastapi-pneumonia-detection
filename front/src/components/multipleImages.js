import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem"

import FormData from "form-data";

const UploadImgs = () => {
  const [selected, setSelected] = useState();
  const [preview, setPreview] = useState();
  const [predict, setPredict] = useState();

  useEffect(() => {}, [preview]);

  const onUpload = (event) => {
    const listeRadios = [];
    console.log('event : ', event.target.files)
    Array.from(event.target.files).forEach((file, idx) => {
      listeRadios.push({img : file.name, title: idx.toString()});
    });
    setSelected(listeRadios)
    console.log("radios : ", listeRadios)
    setPredict();
  };

  const onPredict = async () => {
    if (!selected) {
      alert("Veuillez uploader une image pour lancer la prédiction");
    } else {
      const formData = new FormData();
      formData.append("image", selected);
      const resp = await fetch("http://localhost:8000/prediction_single_pneumonie", {
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
          Upload images
          <input hidden type="file" onChange={onUpload} multiple />
        </Button>
      </Stack>
      {selected ? (
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
              {selected.forEach((item) => (
                <ImageListItem>
                  <img
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
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
