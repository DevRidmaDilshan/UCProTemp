import React, { useState, useEffect } from 'react';
import AlertNotification from './AlertNotification';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, TextField, 
  IconButton, Button, Dialog, DialogActions, 
  DialogContent, DialogTitle 
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  Edit as EditIcon, 
  Visibility as VisibilityIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { getRegisters, deleteRegister } from '../services/api';
import RegisterForm from './RegisterForm';
import InvoiceView from './InvoiceView';

const RegisterList = () => {
  const [registers, setRegisters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [openInvoice, setOpenInvoice] = useState(false);
  const [currentRegister, setCurrentRegister] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [notification, setNotification] = useState({ message: '', severity: 'success' });

  useEffect(() => {
    fetchRegisters();
  }, []);

  const fetchRegisters = async () => {
    try {
      const res = await getRegisters(searchTerm);
      setRegisters(res.data);
    } catch (error) {
      showNotification('Error loading registers', 'error');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    fetchRegisters();
  };

  const handleEdit = (register) => {
    setCurrentRegister(register);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteRegister(id);
      fetchRegisters();
      showNotification('Register deleted successfully', 'success');
    } catch (error) {
      showNotification('Error deleting register', 'error');
    }
    setDeleteConfirm(null);
  };

  const handleFormClose = () => {
    setOpenForm(false);
    setCurrentRegister(null);
    fetchRegisters();
  };

  const showNotification = (message, severity) => {
    setNotification({ message, severity });
    setTimeout(() => setNotification({ message: '', severity: 'success' }), 3000);
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon />
          }}
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => {
            setCurrentRegister(null);
            setOpenForm(true);
          }}
        >
          New Registration
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reg No</TableCell>
              <TableCell>Received Date</TableCell>
              <TableCell>Claim No</TableCell>
              <TableCell>Dealer Code</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registers.map(register => (
              <TableRow key={register.id}>
                <TableCell>{register.id}</TableCell>
                <TableCell>{register.receivedDate}</TableCell>
                <TableCell>{register.claimNo}</TableCell>
                <TableCell>{register.dealerCode}</TableCell>
                <TableCell>{register.size}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(register)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => setDeleteConfirm(register.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                  <IconButton onClick={() => {
                    setCurrentRegister(register);
                    setOpenInvoice(true);
                  }}>
                    <VisibilityIcon color="info" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Form Dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>{currentRegister ? 'Edit Registration' : 'New Registration'}</DialogTitle>
        <DialogContent>
          <RegisterForm 
            editData={currentRegister} 
            onSuccess={handleFormClose} 
          />
        </DialogContent>
      </Dialog>

      {/* Invoice Dialog */}
      <Dialog open={openInvoice} onClose={() => setOpenInvoice(false)} maxWidth="md" fullWidth>
        <DialogContent>
          <InvoiceView data={currentRegister} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInvoice(false)}>Close</Button>
          <Button variant="contained" onClick={() => window.print()}>Print</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this register?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Cancel</Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={() => handleDelete(deleteConfirm)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      {notification.message && (
        <AlertNotification 
            message={notification.message} 
            severity={notification.severity} 
            onClose={() => setNotification({ message: '', severity: 'success' })}
        />
        )}
      {/* {notification.message && (
        <div className={`notification ${notification.severity}`}>
          {notification.message}
        </div>
      )} */}
    </Paper>
  );
};

export default RegisterList;