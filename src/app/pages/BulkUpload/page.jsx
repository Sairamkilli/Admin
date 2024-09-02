'use client'
import React, { useState } from 'react';
import { Button, Typography, TextField, Grid, Paper, Select, MenuItem } from '@mui/material';
// import { saveAs } from 'file-saver';

const BulkPayslip = () => {
  const [employeeIds, setEmployeeIds] = useState('');
  const [template, setTemplate] = useState(''); // Added dropdown with a value templates

  const handleDownload = () => {
    // Assuming the API endpoint for generating bulk payslips is '/api/bulkPayslip'
    fetch('/api/bulkPayslip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employeeIds, template }), // Added template to the request body
    })
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'bulkPayslip.zip');
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Bulk Payslip Generation
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Select
            label="Template"
            value={template}
            onChange={e => setTemplate(e.target.value)}
            fullWidth
          >
            <MenuItem value="template1">Template 1</MenuItem>
            <MenuItem value="template2">Template 2</MenuItem>
            <MenuItem value="template3">Template 3</MenuItem>
            <MenuItem value="template3">Template 4</MenuItem>
            <MenuItem value="template3">Template 5</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Employee IDs (comma separated)"
            value={employeeIds}
            onChange={e => setEmployeeIds(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleDownload}>
            Download
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BulkPayslip;