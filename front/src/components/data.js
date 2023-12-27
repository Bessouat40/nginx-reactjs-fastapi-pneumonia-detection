import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/system';
import { styled } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchBar from 'material-ui-search-bar';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Typography } from '@mui/material';

const Data = () => {
  const [rows, setRows] = useState();
  const [filterRows, setFilter] = useState();
  const [lengthRows, setLength] = useState();
  const [lengthFilter, setLengthFilter] = useState();
  const [searched, setSearched] = useState('');
  const [filterDiagnostic, setFilterDiagnostic] = useState('');

  useEffect(() => {
    const sendFetch = async () => {
      const resp = await fetch('http://localhost:8000/require', {
        method: 'POST',
      });
      const data = await resp.json();
      return data;
    };

    const createData = (filename, pred, date, doctor) => {
      return { filename, pred, date, doctor };
    };

    /**
     * Receive data to display
     */
    const getData = async () => {
      const data = await sendFetch();
      const row = [];
      data.forEach((d) => {
        row.push(createData(d[0], d[1], d[2], d[3]));
      });
      setRows(row);
      setFilter(row);
      setLength(row.length);
      setLengthFilter(row.length);
    };

    getData();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#740d10',
      color: 'white',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  /**
   *
   * @param {*} searchedVal doctor name we want to filter on
   */
  const requestSearchFilename = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return row.filename.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setLengthFilter(filteredRows.length);
    setFilter(filteredRows);
  };

  const requestSearchDoctor = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      console.log('doctor : ', row);
      return row.doctor.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setLengthFilter(filteredRows.length);
    setFilter(filteredRows);
  };

  const requestSearchDiagnostic = (searchedVal) => {
    setFilterDiagnostic(searchedVal.target.value);
    const filteredRows = rows.filter((row) => {
      return row.pred
        .toLowerCase()
        .includes(searchedVal.target.value.toLowerCase());
    });
    setLengthFilter(filteredRows.length);
    setFilter(filteredRows);
  };

  /**
   * Reset display
   */
  const cancelSearchFilename = () => {
    setSearched('');
    requestSearchFilename(searched);
    setLengthFilter(rows.length);
  };

  /**
   * Reset display
   */
  const cancelSearchDoctor = () => {
    setSearched('');
    setLengthFilter(rows.length);
    requestSearchDoctor(searched);
  };

  return (
    <Stack sx={{ height: '100vh', overflow: 'hidden' }}>
      <Stack spacing={5} alignItems="center">
        <Stack
          spacing={2}
          alignItems="center"
          sx={{
            maxHeight: 700,
            marginBottom: '10px',
            paddingTop: '10px',
            paddingLeft: '10px',
            paddingRight: '10px',
            borderRadius: '10px',
            width: '90%',
            maxWidth: '1200px',
            borderColor: 'rgb(249,249,249,0.8)',
            backgroundColor: 'rgb(249,249,249,0.8)',
          }}
        >
          <Stack direction="row" spacing={5} justifyContent="center">
            <SearchBar
              value={searched}
              onChange={(searchVal) => requestSearchFilename(searchVal)}
              onCancelSearch={() => cancelSearchFilename()}
              placeholder="Filter on a patient name"
            />
            <SearchBar
              value={searched}
              onChange={(searchVal) => requestSearchDoctor(searchVal)}
              onCancelSearch={() => cancelSearchDoctor()}
              placeholder="Filter on a doctor name"
            />
            <FormControl
              variant="standard"
              sx={{ minWidth: 120, backgroundColor: 'white' }}
            >
              <InputLabel id="select-diagnostic">Diagnostic</InputLabel>
              <Select
                value={filterDiagnostic}
                label="Diagnostic"
                onChange={requestSearchDiagnostic}
              >
                <MenuItem value={''}>None</MenuItem>
                <MenuItem value={'pneumonia'}>Pneumonia</MenuItem>
                <MenuItem value={'normal'}>Normal</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Typography>{lengthRows} data in the database</Typography>
          <Typography>{lengthFilter} results for your filter</Typography>
          {filterRows ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1200 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Filenames</StyledTableCell>
                    <StyledTableCell align="center">
                      Predictions
                    </StyledTableCell>
                    <StyledTableCell align="center">Date</StyledTableCell>
                    <StyledTableCell align="center">Doctor</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterRows.map((row, idx) => (
                    <TableRow
                      key={idx}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {row.filename}
                      </TableCell>
                      <TableCell align="center">{row.pred}</TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">{row.doctor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div></div>
          )}
          <br />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Data;
