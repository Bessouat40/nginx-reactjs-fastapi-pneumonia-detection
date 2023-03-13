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

const Data = () => {
  const [rows, setRows] = useState();
  const [filterRows, setFilter] = useState();
  const [searched, setSearched] = useState('');

  useEffect(() => {
    const sendFetch = async () => {
      const resp = await fetch('/api/require', {
        method: 'POST',
      });
      const data = await resp.json();
      return data;
    };

    const createData = (filename, pred, date) => {
      return { filename, pred, date };
    };

    /**
     * Receive data to display
     */
    const getData = async () => {
      const data = await sendFetch();
      const row = [];
      data.forEach((d) => {
        row.push(createData(d[0], d[1], d[2]));
      });
      setRows(row);
      setFilter(row);
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
   * @param {*} searchedVal patient name we want to filter on
   */
  const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return row.filename.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setFilter(filteredRows);
  };

  /**
   * Reset display
   */
  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };

  return (
    <Stack sx={{ height: '100vh', overflow: 'hidden' }}>
      <Stack spacing={5} alignItems="center">
        <Stack
          spacing={2}
          sx={{
            maxHeight: 700,
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: 15,
            borderColor: '#FFFFFF',
          }}
        >
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
            placeholder="Filter on a patient name"
          />
          {filterRows ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 1200 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Filenames</StyledTableCell>
                    <StyledTableCell align="center">
                      Predictions
                    </StyledTableCell>
                    <StyledTableCell align="right">Date</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterRows.map((row, idx) => (
                    <TableRow
                      key={idx}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.filename}
                      </TableCell>
                      <TableCell align="center">{row.pred}</TableCell>
                      <TableCell align="right">{row.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div></div>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Data;
