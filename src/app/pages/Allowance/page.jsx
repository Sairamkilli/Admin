'use client'
import React, { useState } from 'react';
import {
    Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography,
    Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    TextField, Checkbox, FormControlLabel, Grid, Box, Snackbar, Alert
} from '@mui/material';
import { Edit, Clear as ClearIcon } from '@mui/icons-material';

const AllowancePage = () => {
    const isAdmin = true;

    const initialEmployees = [
        { id: 1, name: 'John Doe', countryId: 'US', description: 'Sample employee description', taxable: false, mandatory: true, allowances: [] },
        { id: 2, name: 'Jane Smith', countryId: 'UK', description: 'Another sample employee', taxable: true, mandatory: false, allowances: [] },
        { id: 3, name: 'Smith', countryId: 'India', description: 'Another sample employee', taxable: true, mandatory: false, allowances: [] },
    ];

    const [employees, setEmployees] = useState(initialEmployees);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [allowances, setAllowances] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [currentAllowance, setCurrentAllowance] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleEmployeeChange = (event) => {
        const empId = event.target.value;
        setSelectedEmployeeId(empId);

        const employee = employees.find(emp => emp.id === Number(empId));
        setSelectedEmployee(employee || null);
        setAllowances(employee ? employee.allowances : []);
    };

    const handleAddAllowance = () => {
        const newAllowance = { id: Date.now(), name: 'New Allowance', amount: 0, description: '', Taxable: false, Mandatory: false };
        setAllowances([...allowances, newAllowance]);
    };

    const handleEditAllowance = (allowance) => {
        setCurrentAllowance(allowance);
        setEditDialogOpen(true);
    };

    const handleSaveEdit = () => {
        setAllowances(allowances.map(allowance =>
            allowance.id === currentAllowance.id ? currentAllowance : allowance
        ));
        setEditDialogOpen(false);
    };

    const handleDeleteAllowance = (id) => {
        setAllowances(allowances.filter(allowance => allowance.id !== id));
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
                emp.id === selectedEmployee.id ? { ...emp, allowances } : emp
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
                            <Typography variant="body1" sx={{ color: '#FFD700' }}> {/* Gold */}
                                <strong>Name:</strong> <span style={{ color: '#00008B' }}>{selectedEmployee.name}</span> {/* Dark Blue */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" sx={{ color: '#FFD700' }}> {/* Gold */}
                                <strong>Country ID:</strong> <span style={{ color: '#00008B' }}>{selectedEmployee.countryId}</span> {/* Dark Blue */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" sx={{ color: '#FFD700' }}> {/* Gold */}
                                <strong>Description:</strong> <span style={{ color: '#00008B' }}>{selectedEmployee.description}</span> {/* Dark Blue */}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" sx={{ color: '#FFD700' }}> {/* Gold */}
                                <strong>Taxable:</strong> <span style={{ color: selectedEmployee.taxable ? '#27AE60' : '#C0392B' }}>{selectedEmployee.taxable ? 'Yes' : 'No'}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" sx={{ color: '#FFD700' }}> {/* Gold */}
                                <strong>Mandatory:</strong> <span style={{ color: selectedEmployee.mandatory ? '#27AE60' : '#C0392B' }}>{selectedEmployee.mandatory ? 'Yes' : 'No'}</span>
                            </Typography>
                        </Grid>
                    </Grid>
                )}
            </Box>

            <Box mb={4} sx={{ backgroundColor: '#ffffff', padding: 3, borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#2C3E50' }}>
                    Allowance Page
                </Typography>
                <Box mb={2}>
                    <Button variant="contained" sx={{ backgroundColor: '#DE2D11', color: '#ffffff' }} onClick={handleAddAllowance}>
                        Add Allowance
                    </Button>
                </Box>
                <List>
                    {allowances.map(allowance => (
                        <ListItem key={allowance.id} sx={{ backgroundColor: '#ECF0F1', mb: 1, borderRadius: 1 }}>
                            <ListItemText
                                primary={
                                    <Box>
                                        <Typography variant="h6" sx={{ color: '#00008B' }}> {/* Dark Blue */}
                                            {allowance.name}
                                        </Typography>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={6} textAlign="left">
                                                <Typography variant="body2" sx={{ color: '#34495E' }}>
                                                    {allowance.description}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} textAlign="right" ml={-10}>
                                                <Typography variant="body2" sx={{ color: '#34495E' }}>
                                                    {getCurrencySymbol(selectedEmployee?.countryId)}{allowance.amount}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                }
                                secondary={
                                    <Typography variant="body2" sx={{ color: '#34495E' }}>
                                        {allowance.Mandatory ? 'Required' : 'Optional'}
                                    </Typography>
                                }
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="edit" onClick={() => handleEditAllowance(allowance)}>
                                    <Edit sx={{ color: '#27AE60', fontSize: '1.75rem' }} />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAllowance(allowance.id)}>
                                    <ClearIcon sx={{ color: '#DE2D11', fontSize: '2.25rem' }} /> {/* Updated icon */}
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
                <DialogTitle>Edit Allowance</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit the details of the allowance.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={currentAllowance?.name || ''}
                        onChange={(e) => setCurrentAllowance({ ...currentAllowance, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Amount"
                        type="number"
                        fullWidth
                        value={currentAllowance?.amount || ''}
                        onChange={(e) => setCurrentAllowance({ ...currentAllowance, amount: parseFloat(e.target.value) })}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={currentAllowance?.description || ''}
                        onChange={(e) => setCurrentAllowance({ ...currentAllowance, description: e.target.value })}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={currentAllowance?.Taxable || false}
                                onChange={(e) => setCurrentAllowance({ ...currentAllowance, Taxable: e.target.checked })}
                            />
                        }
                        label="Taxable"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={currentAllowance?.Mandatory || false}
                                onChange={(e) => setCurrentAllowance({ ...currentAllowance, Mandatory: e.target.checked })}
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

export default AllowancePage;