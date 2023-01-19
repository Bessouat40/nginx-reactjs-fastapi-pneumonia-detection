import React, { useState }from "react";
import { Stack } from "@mui/system";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchBar from "material-ui-search-bar";

const Data = () => {

    const [rows, setRows] = useState();
    const [filterRows, setFilter] = useState();
    const [searched, setSearched] = useState("");

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: "#514d4c",
          color: "white",
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

    const createData = (filename, pred) => {
        return {filename, pred};
      }

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
        setSearched("");
        requestSearch(searched);
      };

    /**
     * Require data from Postgres database
     * @returns data received
     */
    const sendFetch = async () => {
        const resp = await fetch('/api/require', {
            method: "POST",
          });
        const data = await resp.json();
        return data
    }

    /**
     * Receive data to display
     */
    const onReceive = async () => {
        const data = await sendFetch()
        const row = [];
        data.forEach((d) => {
            row.push(createData(d[0], d[1]))
          })  
        setRows(row)
        setFilter(row)
      }

    return (
        <Stack spacing={5} alignItems="center">
            {rows ? (
                <Stack spacing={2} style={{maxHeight:700}}>
                    <SearchBar
                    value={searched}
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                    placeholder="Filter on a patient name"
                    />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth:1200}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Filenames</StyledTableCell>
                                <StyledTableCell align="right">Predictions</StyledTableCell>
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
                            <TableCell align="right">{row.pred}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            ) : (
                <Button variant="contained" style={{backgroundColor:"#514d4c", height:100, width:200}} onClick={onReceive}>
                    Display Data
                </Button>)

            }
            
        </Stack>
    )
}

export default Data;