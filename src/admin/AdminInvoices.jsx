import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const API = 'http://localhost:5000';

const AdminInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [tab, setTab] = useState(0);

  const token = localStorage.getItem('admin_token');

  const fetchInvoices = async () => {
    try {
      const res = await axios.get(`${API}/admin/invoices`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvoices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleMenuClick = (event, invoice) => {
    setAnchorEl(event.currentTarget);
    setSelectedInvoice(invoice);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedInvoice(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/admin/invoice/${selectedInvoice.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchInvoices();
      handleMenuClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkPaid = async (method) => {
    try {
      await axios.put(
        `${API}/admin/invoice/${selectedInvoice.id}/mark-paid`,
        { method },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchInvoices();
      handleMenuClose();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredInvoices = invoices.filter((inv) =>
    tab === 0 ? true : tab === 1 ? inv.status === 'outstanding' : inv.status === 'paid'
  );

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Admin - Invoices
      </Typography>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="All" />
        <Tab label="Outstanding" />
        <Tab label="Paid" />
      </Tabs>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Balance Due</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInvoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell>{inv.id}</TableCell>
                <TableCell>{inv.client}</TableCell>
                <TableCell>{new Date(inv.date).toDateString()}</TableCell>
                <TableCell align="right">₹{inv.balance_due.toFixed(2)}</TableCell>
                <TableCell align="right">{inv.status}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={(e) => handleMenuClick(e, inv)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredInvoices.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No invoices found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {selectedInvoice?.balance_due > 0 && (
          <>
            <MenuItem onClick={() => handleMarkPaid('cash')}>Mark as Paid (Cash)</MenuItem>
            <MenuItem onClick={() => handleMarkPaid('bank_transfer')}>Mark as Paid (Bank Transfer)</MenuItem>
            <MenuItem onClick={() => handleMarkPaid('upi')}>Mark as Paid (UPI)</MenuItem>
            <MenuItem onClick={() => handleMarkPaid('net_banking')}>Mark as Paid (Net Banking)</MenuItem>
            <MenuItem onClick={() => handleMarkPaid('cheque')}>Mark as Paid (Cheque)</MenuItem>
          </>
        )}
        <MenuItem onClick={handleDelete}>Delete Invoice</MenuItem>
        <MenuItem onClick={handleMenuClose}>Cancel</MenuItem>
      </Menu>
    </Box>
  );
};

export default AdminInvoices;
