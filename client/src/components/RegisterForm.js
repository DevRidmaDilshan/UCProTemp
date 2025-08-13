import React, { useState, useEffect } from 'react';
import AlertNotification from './AlertNotification';
import { TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import { 
  createRegister, 
  updateRegister,
  getDealers, 
  getSizesByBrand, 
  getConsultants 
} from '../services/api';

const RegisterForm = ({ onSuccess, editData }) => {
  const [stage, setStage] = useState(editData ? 2 : 1);
  const [dealers, setDealers] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [notification, setNotification] = useState({ message: '', severity: 'success' });

  const [formData, setFormData] = useState({
    claimNo: '',
    dealerView: '',
    dealerCode: '',
    brand: '',
    size: '',
    sizeCode: '',
    obsDate: '',
    techObs: '',
    treadDepth: '',
    consultantName: '',
    obsNo: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dealersRes = await getDealers();
        setDealers(dealersRes.data);
        
        const consultantsRes = await getConsultants();
        setConsultants(consultantsRes.data);
        
        if (editData) {
          setFormData(editData);
          if (editData.brand) {
            const sizesRes = await getSizesByBrand(editData.brand);
            setSizes(sizesRes.data);
          }
        }
      } catch (error) {
        showNotification('Error loading data', 'error');
      }
    };
    
    fetchData();
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'dealerView') {
      const selectedDealer = dealers.find(d => d.dealerView === value);
      if (selectedDealer) {
        setFormData(prev => ({ 
          ...prev, 
          dealerCode: selectedDealer.dealerCode 
        }));
      }
    }
    
    if (name === 'brand') {
      fetchSizes(value);
    }
    
    if (name === 'size') {
      const selectedSize = sizes.find(s => s.size === value);
      if (selectedSize) {
        setFormData(prev => ({ 
          ...prev, 
          sizeCode: selectedSize.sizeCode 
        }));
      }
    }
  };

  const fetchSizes = async (brand) => {
    try {
      const res = await getSizesByBrand(brand);
      setSizes(res.data);
    } catch (error) {
      showNotification('Error loading sizes', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (stage === 1) {
        await createRegister(formData);
        showNotification('Register created successfully!', 'success');
        setStage(2);
      } else {
        await updateRegister(formData.id, formData);
        showNotification('Register updated successfully!', 'success');
        onSuccess();
      }
    } catch (error) {
      showNotification(error.response?.data?.error || 'Error saving data', 'error');
    }
  };

  const showNotification = (message, severity) => {
    setNotification({ message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ message: '', severity: 'success' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <AlertNotification 
            message={notification.message} 
            severity={notification.severity} 
            onClose={handleCloseNotification} 
        />
      
      {stage === 1 ? (
        <Grid container spacing={2}>
          {/* Stage 1 Fields */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Claim No"
              name="claimNo"
              value={formData.claimNo}
              onChange={handleChange}
              required
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Dealer View</InputLabel>
              <Select
                name="dealerView"
                value={formData.dealerView}
                onChange={handleChange}
                required
              >
                {dealers.map(dealer => (
                  <MenuItem key={dealer.dealerCode} value={dealer.dealerView}>
                    {dealer.dealerView}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Dealer Code"
              name="dealerCode"
              value={formData.dealerCode}
              onChange={handleChange}
              disabled
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Brand</InputLabel>
              <Select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              >
                <MenuItem value="BrandA">Brand A</MenuItem>
                <MenuItem value="BrandB">Brand B</MenuItem>
                <MenuItem value="BrandC">Brand C</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Size</InputLabel>
              <Select
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
                disabled={!formData.brand}
              >
                {sizes.map(size => (
                  <MenuItem key={size.sizeCode} value={size.size}>
                    {size.size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Size Code"
              name="sizeCode"
              value={formData.sizeCode}
              onChange={handleChange}
              disabled
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save & Continue
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {/* Stage 2 Fields */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Observation Date"
              name="obsDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.obsDate}
              onChange={handleChange}
              required
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Technical Observation</InputLabel>
              <Select
                name="techObs"
                value={formData.techObs}
                onChange={handleChange}
                required
              >
                <MenuItem value="Cut">Cut</MenuItem>
                <MenuItem value="Crack">Crack</MenuItem>
                <MenuItem value="Wear">Wear</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Tread Depth (mm)"
              name="treadDepth"
              type="number"
              value={formData.treadDepth}
              onChange={handleChange}
              required
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Consultant</InputLabel>
              <Select
                name="consultantName"
                value={formData.consultantName}
                onChange={handleChange}
                required
              >
                {consultants.map(consultant => (
                  <MenuItem key={consultant.consultantName} value={consultant.consultantName}>
                    {consultant.consultantName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Observation Number</InputLabel>
              <Select
                name="obsNo"
                value={formData.obsNo}
                onChange={handleChange}
                required
              >
                <MenuItem value="R__">Recommended (R__)</MenuItem>
                <MenuItem value="NR__">Not Recommended (NR__)</MenuItem>
                <MenuItem value="SCN__">Forwarded (SCN__)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
              {editData ? 'Update' : 'Complete Registration'}
            </Button>
            <Button variant="outlined" onClick={() => setStage(1)}>
              Back
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default RegisterForm;