import React, { forwardRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography } from '@mui/material';

const InvoiceView = forwardRef(({ data }, ref) => {
  if (!data) return null;

  return (
    <div ref={ref} style={{ padding: 20 }}>
      <Typography variant="h4" align="center" gutterBottom>
        UCProTemp Report
      </Typography>
      
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><strong>Registration No:</strong></TableCell>
              <TableCell>{data.id}</TableCell>
              <TableCell><strong>Received Date:</strong></TableCell>
              <TableCell>{data.receivedDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Claim No:</strong></TableCell>
              <TableCell>{data.claimNo}</TableCell>
              <TableCell><strong>Dealer Code:</strong></TableCell>
              <TableCell>{data.dealerCode}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Brand:</strong></TableCell>
              <TableCell>{data.brand}</TableCell>
              <TableCell><strong>Size:</strong></TableCell>
              <TableCell>{data.size}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
      <Typography variant="h6" gutterBottom>
        Technical Details
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><strong>Observation Date:</strong></TableCell>
              <TableCell>{data.obsDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Technical Observation:</strong></TableCell>
              <TableCell>{data.techObs}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Tread Depth:</strong></TableCell>
              <TableCell>{data.treadDepth} mm</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Consultant:</strong></TableCell>
              <TableCell>{data.consultantName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Observation No:</strong></TableCell>
              <TableCell>{data.obsNo}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
      <div style={{ marginTop: 30, textAlign: 'center' }}>
        <Typography variant="body2">
          Generated on: {new Date().toLocaleDateString()}
        </Typography>
      </div>
    </div>
  );
});

export default InvoiceView;