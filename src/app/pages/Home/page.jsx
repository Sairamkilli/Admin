'use client';
import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

const HomePage = () => {
    return (
        <Container component="main" maxWidth="md">
            <Paper sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to the Home Page
                </Typography>
                <Typography variant="body1">
                    This is the home page of our application. Here you can find various resources and links to navigate through the app.
                </Typography>
            </Paper>
        </Container>
    );
};

export default HomePage;
