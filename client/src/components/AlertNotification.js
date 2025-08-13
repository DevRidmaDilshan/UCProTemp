import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const AlertNotification = ({ message, severity, onClose }) => {
  return (
    <Snackbar 
      open={!!message} 
      autoHideDuration={3000} 
      onClose={onClose}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertNotification;