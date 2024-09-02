"use client";
import React, { useState } from 'react';
import {
    Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography,
    Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    TextField, Checkbox, FormControlLabel, Grid, Box, Snackbar, Alert
} from '@mui/material';
import { Edit, Clear as ClearIcon } from '@mui/icons-material';

const DeductionsPage = () => {
    const isAdmin = true;

    const initialEmployees = [
        { id: 1, name: 'John Doe', countryId: 'US', description: 'Sample employee description', taxable: false, mandatory: true, deductions: [] },
        { id: 2, name: 'Jane Smith', countryId: 'UK', description: 'Another sample employee', taxable: true, mandatory: false, deductions: [] },
        { id: 3, name: 'Smith', countryId: 'India', description: 'Another sample employee', taxable: true, mandatory: false, deductions: [] },
    ];

    const [employees, setEmployees] = useState(initialEmployees);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [deductions, setDeductions] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [currentDeduction, setCurrentDeduction] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleEmployeeChange = (event) => {
        const empId = event.target.value;
        setSelectedEmployeeId(empId);

        const employee = employees.find(emp => emp.id === Number(empId));
        setSelectedEmployee(employee || null);
        setDeductions(employee ? employee.deductions : []);
    };

    const handleAddDeduction = () => {
        const newDeduction = { id: Date.now(), name: 'New Deduction', description: '', Taxable: false, Mandatory: false };
        setDeductions([...deductions, newDeduction]);
    };

    const handleEditDeduction = (deduction) => {
        setCurrentDeduction(deduction);
        setEditDialogOpen(true);
    };

    const handleSaveEdit = () => {
        setDeductions(deductions.map(deduction =>
            deduction.id === currentDeduction.id ? currentDeduction : deduction
        ));
        setEditDialogOpen(false);
    };

    const handleDeleteDeduction = (id) => {
        setDeductions(deductions.filter(deduction => deduction.id !== id));
    };

    const getCurrencySymbol = (countryId) => {
        switch (countryId) {
            case 'US':
                return '$';
            case 'UK':
                return '£';
            case 'India':
                return '₹';
            // Add more countries and currencies as needed
            default:
                return '$';
        }
    };

    const handleSubmit = () => {
        if (selectedEmployee) {
            const updatedEmployees = employees.map(emp =>
                emp.id === selectedEmployee.id ? { ...emp, deductions } : emp
            );
            setEmployees(updatedEmployees);
            setSnackbarOpen(true);
            console.log('Updated Employees:', updatedEmployees);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container sx={{ padding: 4, borderRadius: 2 }}>
            <Box mb={4} sx={{ backgroundColor: '#ffffff', padding: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#2C3E50' }}>
                    Employee Details
                </Typography>

                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Employee ID"
                            value={selectedEmployeeId}
                            onChange={handleEmployeeChange}
                            disabled={!isAdmin}
                            sx={{
                                backgroundColor: '#ffffff',
                                borderRadius: 1,
                                '&:hover': {
                                    backgroundColor: '#ECF0F1',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#BDC3C7',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#3498DB',
                                    },
                                },
                            }}
                        />
                    </Grid>
                </Grid>

                {selectedEmployee && (
                    <Grid container spacing={2} alignItems="center" mt={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" sx={{ color: '#FFD700' }}>
                                <strong>Name:</strong> <span style={{ color: '#00008B' }}>{selectedEmployee.name}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" sx={{ color: '#FFD700' }}>
                                <strong>Country ID:</strong> <span style={{ color: '#00008B' }}>{selectedEmployee.countryId}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" sx={{ color: '#FFD700' }}>
                                <strong>Description:</strong> <span style={{ color: '#00008B' }}>{selectedEmployee.description}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" sx={{ color: '#FFD700' }}>
                                <strong>Taxable:</strong> <span style={{ color: selectedEmployee.taxable ? '#27AE60' : '#C0392B' }}>{selectedEmployee.taxable ? 'Yes' : 'No'}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" sx={{ color: '#FFD700' }}>
                                <strong>Mandatory:</strong> <span style={{ color: selectedEmployee.mandatory ? '#27AE60' : '#C0392B' }}>{selectedEmployee.mandatory ? 'Yes' : 'No'}</span>
                            </Typography>
                        </Grid>
                    </Grid>
                )}
            </Box>

            <Box mb={4} sx={{ backgroundColor: '#ffffff', padding: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#2C3E50' }}>
                    Deductions Page
                </Typography>
                <Box mb={2}>
                    <Button variant="contained" sx={{ backgroundColor: '#DE2D11', color: '#ffffff' }} onClick={handleAddDeduction}>
                        Add Deduction
                    </Button>
                </Box>
                <List>
                    {deductions.map(deduction => (
                        <ListItem key={deduction.id} sx={{ backgroundColor: '#ECF0F1', mb: 1, borderRadius: 1 }}>
                            <ListItemText
                                primary={deduction.name}
                                secondary={deduction.Mandatory ? 'Required' : 'Optional'}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="edit" onClick={() => handleEditDeduction(deduction)}>
                                    <Edit sx={{ color: '#27AE60', fontSize: '1.75rem' }} />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteDeduction(deduction.id)}>
                                    <ClearIcon sx={{ color: '#DE2D11', fontSize: '2.25rem' }} />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                <Box mt={2}>
                    <Button variant="contained" sx={{ backgroundColor: '#27AE60', color: '#ffffff' }} onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
            </Box>

            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                <DialogTitle>Edit Deduction</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit the details of the deduction.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={currentDeduction?.name || ''}
                        onChange={(e) => setCurrentDeduction({ ...currentDeduction, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={currentDeduction?.description || ''}
                        onChange={(e) => setCurrentDeduction({ ...currentDeduction, description: e.target.value })}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={currentDeduction?.Taxable || false}
                                onChange={(e) => setCurrentDeduction({ ...currentDeduction, Taxable: e.target.checked })}
                            />
                        }
                        label="Taxable"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={currentDeduction?.Mandatory || false}
                                onChange={(e) => setCurrentDeduction({ ...currentDeduction, Mandatory: e.target.checked })}
                            />
                        }
                        label="Mandatory"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)} sx={{ color: '#34495E' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleSaveEdit} sx={{ color: '#34495E' }}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Submitted successfully!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default DeductionsPage;