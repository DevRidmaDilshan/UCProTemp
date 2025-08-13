import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import RegisterList from './components/RegisterList';

function App() {
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ mt: 3 }}>
        <span style={{ color: '#1976d2' }}>UC</span>
        <span style={{ color: '#d32f2f' }}>Pro</span>
        <span style={{ color: '#388e3c' }}>Temp</span>
      </Typography>
      <RegisterList />
    </Container>
  );
}

export default App;
