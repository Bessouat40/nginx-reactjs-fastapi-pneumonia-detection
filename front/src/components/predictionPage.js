import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dropzone from './subcomponents/dropzone';
import Images from './subcomponents/images';
import Tables from './subcomponents/tables';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import FormData from 'form-data';
import { TextField } from '@mui/material';

const PredictionPage = () => {
  const [selected, setSelected] = useState();
  const [images, setImages] = useState();
  const [predict, setPredict] = useState();
  const [rows, setRows] = useState();
  const [csvData, setData] = useState();
  const [pastilles, setPastilles] = useState();
  const [isLoading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [open, setOpen] = useState(false);
  const [doctor, setDoctor] = useState('');

  useEffect(() => {}, []);

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
      radios.push({
        img: URL.createObjectURL(reception[0][i]),
        filename: reception[0][i].name.split('.').shift(),
      });
      listeImages.push(reception[0][i]);
      pastille.push('inherit');
    }
    setSelected(radios);
    setPastilles(pastille);
    setImages(listeImages);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createData = (filename, pred) => {
    return { filename, pred };
  };

  /**
   * Send data to backend for diagnostic
   * @returns response from backend
   */
  const sendFormData = async () => {
    const formData = new FormData();
    images.forEach((image) => formData.append('images', image));
    const resp = await fetch('/api/prediction_multiple_pneumonia', {
      body: formData,
      method: 'POST',
    });
    return resp;
  };

  /**
   *
   * @param {List} data response from the backend : images diagnostic
   */
  const storeData = (data) => {
    const row = [];
    const csv_datas = [['Filenames', 'Predictions']];
    let diagnostic = '';
    const pastille = [];
    data.forEach((d, idx) => {
      if (d === 1) {
        diagnostic = 'pneumonia';
        pastille.push('error');
      } else {
        diagnostic = 'normal';
        pastille.push('success');
      }
      row.push(createData(selected[idx]['filename'], diagnostic));
      csv_datas.push([selected[idx]['filename'], diagnostic]);
    });
    return [row, csv_datas, pastille];
  };

  /**
   * Send data to backend for diagnostic and display/store results
   */
  const onPredict = async () => {
    if (!selected) {
      alert('Please upload image(s) to launch prediction');
    } else {
      setLoading(true);
      const resp = await sendFormData();
      const data = await resp.json();
      const [row, csv_datas, pastille] = storeData(data);
      setRows(row);
      setData(csv_datas);
      setPastilles(pastille);
      setPredict(data);
      setRerender(!rerender);
      setLoading(false);
    }
  };

  const onDelete = () => {
    setPredict();
    setSelected();
    setLoading(false);
  };

  const sendStoreData = () => {
    const formData = new FormData();
    csvData.forEach((data) => {
      data.push(doctor);
      console.log(data);
      formData.append('data', JSON.stringify(data));
    });
    fetch('/api/add_data', {
      body: formData,
      method: 'POST',
    });
  };

  const onStore = () => {
    sendStoreData();
    setOpen(false);
    alert('Data succesfully stored');
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Stack
      sx={{
        minHeight: '100vh',
        overflow: 'hidden',
        alignItems: 'center',
        marginBottom: 20,
      }}
    >
      <Stack
        spacing={5}
        alignItems="center"
        sx={{
          alignItems: 'center',
          paddingBottom: '10px',
          paddingTop: '10px',
          paddingLeft: '10px',
          paddingRight: '10px',
          maxWidth: '90%',
          borderRadius: '10px',
          borderColor: 'rgb(249,249,249,0.8)',
          backgroundColor: 'rgb(249,249,249,0.8)',
        }}
      >
        <Stack spacing={30} direction="row" alignItems="center">
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#740d10',
                '&:hover': {
                  backgroundColor: '#aa4656',
                },
              }}
              onClick={onPredict}
            >
              Predict
            </Button>
            <IconButton
              aria-label="delete"
              onClick={onDelete}
              style={{ color: '#740d10' }}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>
        {selected ? (
          <Images selected={selected} pastilles={pastilles} />
        ) : (
          <Dropzone onDrop={onUpload} text={'upload your image'} />
        )}
        {isLoading ? (
          <Stack>
            <CircularProgress sx={{ color: '#740d10' }} />
          </Stack>
        ) : null}
        {predict ? (
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#740d10',
                height: 40,
                '&:hover': {
                  backgroundColor: '#aa4656',
                },
              }}
              onClick={handleClickOpen}
            >
              Store Data
            </Button>
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
                  {'Who are you ?'}
                  <IconButton onClick={onClose}>
                    <CloseIcon />
                  </IconButton>
                </Stack>
              </DialogTitle>
              <DialogContent>
                <TextField
                  label="Doctor Name"
                  onChange={(e) => {
                    setDoctor(e.target.value);
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={onStore}>Validate</Button>
              </DialogActions>
            </Dialog>
            <Tables rows={rows} csvData={csvData} />
          </Stack>
        ) : (
          <div></div>
        )}
      </Stack>
    </Stack>
  );
};

export default PredictionPage;
