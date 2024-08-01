import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import '../styles.css';  // Import the CSS file

const splitData = (data, columns) => {
  const halfwayPoint = Math.ceil(data.rows.length / columns);
  const chunks = [];
  for (let i = 0; i < columns; i++) {
    chunks.push(data.rows.slice(i * halfwayPoint, (i + 1) * halfwayPoint));
  }
  return chunks;
};

const AnalyticsTable = ({ data }) => {
  const columns = 2;
  const splitRows = splitData(data, columns);

  return (
    <div className="table-container">
      {splitRows.map((rows, index) => (
        <TableContainer component={Paper} className="table-column" key={index}>
          <Table className="MuiTable-root">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Active Users</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell component="th" scope="row">
                    {row.dimensionValues[0].value}
                  </TableCell>
                  <TableCell align="right">{row.metricValues[0].value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </div>
  );
};

export default AnalyticsTable;
