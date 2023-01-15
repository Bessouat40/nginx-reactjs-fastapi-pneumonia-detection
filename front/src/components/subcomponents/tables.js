import React, {useEffect } from "react";
import { Stack } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/system";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CSVLink } from "react-csv";
import DownloadIcon from '@mui/icons-material/Download';

const Tables = (props) => {

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

  return (
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
          {props.rows.map((row, idx) => (
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
    <CSVLink data={props.csvData} filename={"predictions.csv"}>
    <IconButton>
    <DownloadIcon/>
    </IconButton>
    </CSVLink>
    </Stack>
  );
};

export default Tables;
