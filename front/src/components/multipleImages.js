import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
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


import FormData from "form-data";

const UploadImgs = () => {
  const [selected, setSelected] = useState();
  const [images, setImages] = useState();
  const [preview, setPreview] = useState();
  const [predict, setPredict] = useState();
  const [rows, setRows] = useState();
  const [csvData, setData] = useState();

  useEffect(() => {}, [preview]);

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
    reception.push(files);
    for (let i = 0; i < reception[0].length; i++) {
        radios.push({img: URL.createObjectURL(reception[0][i]), filename: reception[0][i].name.split('.').shift()})
        listeImages.push(reception[0][i])
    }
    setSelected(radios)
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
      const resp = await fetch("http://localhost:8000/prediction_multiple_pneumonia", {
        body: formData,
        method: "POST",
      });
      const data = await resp.json();
      const row = [];
      const csv_datas = [["Filenames", "Predictions"]];
      data.forEach((d, idx) => {
        row.push(createData(selected[idx]['filename'], d))
        csv_datas.push([selected[idx]['filename'], d])
      })      
      setRows(row)
      setData(csv_datas)
      console.log(row)
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
        <ImageList cols={5}>
        {(selected || []).map((url, idx) => (
        <ImageListItem key={url.filename}>
        <img src={url.img} alt={url.filename} style={{ width: 200, height: 200}} />
        <ImageListItemBar title={url.filename} />
        </ImageListItem>
        ))}
        </ImageList>
        ) : (
          <Dropzone onDrop={onUpload} text={'upload your image'}/>
        )}
      {predict ? <Stack direction='row' spacing={2}><TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
          <TableRow>
            <StyledTableCell>Filenames</StyledTableCell>
            <StyledTableCell align="right">Predictions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.filename}
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
