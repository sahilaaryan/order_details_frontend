import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { orderAPI } from '../apis/orderAPI';
import { useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function TableView(props) {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    orderAPI.getUserAddedInfo()
    .then((data) => {
        setRows([...data]);
    })
  },[props.rows]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Start time</StyledTableCell>
            <StyledTableCell>End time</StyledTableCell>
            <StyledTableCell>No. of hours worked</StyledTableCell>
            <StyledTableCell>Rate per hour</StyledTableCell>
            <StyledTableCell>Supplier name</StyledTableCell>
            <StyledTableCell>Purchase order</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length ? rows.map((row,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell>{row.startDate}</StyledTableCell>
              <StyledTableCell>{row.endDate}</StyledTableCell>
              <StyledTableCell>{row.hours}</StyledTableCell>
              <StyledTableCell>{row.rateHour}</StyledTableCell>
              <StyledTableCell>{row.supplier}</StyledTableCell>
              <StyledTableCell>{row.purchaseOrder}</StyledTableCell>
              <StyledTableCell>{row.description}</StyledTableCell>
            </StyledTableRow>
          )) : <StyledTableCell>!!! No details added</StyledTableCell>}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
