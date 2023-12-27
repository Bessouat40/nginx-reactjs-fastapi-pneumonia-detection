import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import CircleIcon from '@mui/icons-material/Circle';
import { Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import '../../css/images.css';

const Images = (props) => {
  const [open, setOpen] = useState(false);
  const [displayUrl, setDisplayUrl] = useState();
  const [activationImage, setActivationImage] = useState();
  const images = props.images;
  useEffect(() => {}, []);

  const onImageClick = (url, idx) => {
    setActivationImage();
    setOpen(true);
    setDisplayUrl(url);
    sendFormData(idx);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendFormData = async (idx) => {
    const formData = new FormData();
    console.log(images[idx]);
    formData.append('image', images[idx]);
    try {
      const response = await fetch(
        'http://localhost:8000/prediction_single_pneumonia',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setActivationImage(data.image);
    } catch (error) {
      console.error('Error sending the image:', error);
    }
  };

  return (
    <Stack
      style={{
        maxHeight: 450,
        borderRadius: '10px',
      }}
      spacing={5}
    >
      {activationImage ? (
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            <Stack
              direction="row"
              spacing={10}
              alignItems="center"
              justifyContent="center"
            >
              {displayUrl.filename}
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <img
              src={`data:image/png;base64,${activationImage}`}
              alt="Activation"
              style={{ width: 500, height: 500 }}
            />
          </DialogContent>
        </Dialog>
      ) : null}
      <ImageList cols={5} gap={25}>
        {(props.selected || []).map((url, idx) => (
          <ImageListItem key={idx + url.filename} className="image-hover-zoom">
            <img
              src={url.img}
              alt={url.filename}
              style={{ width: 200, height: 200 }}
              onClick={() => onImageClick(url, idx)}
            />
            <ImageListItemBar
              title={url.filename}
              actionIcon={
                <IconButton color={props.pastilles[idx]} aria-label={`star`}>
                  <CircleIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Stack direction="row" spacing={5}>
        <Stack direction="row">
          <CircleIcon color="success" />
          <Typography> : normal</Typography>
        </Stack>
        <Stack direction="row">
          <CircleIcon color="error" />
          <Typography> : pneumonia</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Images;
