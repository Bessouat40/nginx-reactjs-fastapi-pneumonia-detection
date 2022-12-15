import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { Stack } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem"
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CSVLink } from "react-csv";
import DownloadIcon from '@mui/icons-material/Download';
import Dropzone from "./dropzone";
import CircleIcon from '@mui/icons-material/Circle';


import FormData from "form-data";

const UploadImgs = () => {
  const [selected, setSelected] = useState();
  const [images, setImages] = useState();
  const [predict, setPredict] = useState();
  const [rows, setRows] = useState();
  const [csvData, setData] = useState();
  const [pastilles, setPastilles] = useState();
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#514d4c",
      color: "white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

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

  const onPredict = async () => {
    if (!selected) {
      alert("Veuillez uploader une image pour lancer la prédiction");
    } else {
      const formData = new FormData();
      images.forEach((image) => formData.append("images", image));
      const resp = await fetch('/api/prediction_multiple_pneumonia', {
        body: formData,
        method: "POST",
      });
      const data = await resp.json();
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
        <Stack style={{maxHeight:450 }}>
        <ImageList cols={5}>
        {(selected || []).map((url, idx) => (
        <ImageListItem key={idx + url.filename}>
        <img src={url.img} alt={url.filename} style={{ width: 200, height: 200}} />
        <ImageListItemBar title={url.filename}
              actionIcon={
                <IconButton
                  color={pastilles[idx]}
                  aria-label={`star`}
                >
                  <CircleIcon />
                </IconButton>}/>
        </ImageListItem>
        ))}
        </ImageList>
        </Stack>
        ) : (
          <Dropzone onDrop={onUpload} text={'upload your image'}/>
        )}
      {predict ? 
      <Stack direction='row' spacing={2} style={{maxHeight:450}}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
          <TableRow>
            <StyledTableCell>Filenames</StyledTableCell>
            <StyledTableCell align="right">Predictions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.filename}
              </TableCell>
              <TableCell align="right">{row.pred}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <CSVLink data={csvData} filename={"predictions.csv"}>
    <IconButton>
    <DownloadIcon/>
    </IconButton>
    </CSVLink>
    </Stack> : <div></div>}
    </Stack>
  );
};

export default UploadImgs;
