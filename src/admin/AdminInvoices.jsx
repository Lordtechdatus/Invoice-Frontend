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
  Stack,
  TextField,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SideBar from './AdminSidePanel';

const API = 'http://localhost:5000';

const AdminInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [tab, setTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

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

  const matchesTab = (inv) => (tab === 0 ? true : tab === 1 ? inv.status === 'outstanding' : inv.status === 'paid');
  const matchesSearch = (inv) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      String(inv.id).toLowerCase().includes(q) ||
      String(inv.client || '').toLowerCase().includes(q) ||
      String(inv.status || '').toLowerCase().includes(q)
    );
  };
  const isInDateRange = (inv) => {
    if (!fromDate && !toDate) return true;
    const d = new Date(inv.date);
    if (fromDate) {
      const f = new Date(fromDate);
      if (d < f) return false;
    }
    if (toDate) {
      const t = new Date(toDate);
      t.setHours(23, 59, 59, 999);
      if (d > t) return false;
    }
    return true;
  };

  const filteredInvoices = invoices.filter((inv) => matchesTab(inv) && matchesSearch(inv) && isInDateRange(inv));

  const downloadCSV = (rows, filename) => {
    const header = ['Invoice ID','Client','Date','Balance Due','Status'];
    const csvRows = [header.join(',')].concat(
      rows.map((inv) => [
        inv.id,
        `"${(inv.client || '').toString().replace(/"/g,'""')}"`,
        new Date(inv.date).toISOString().slice(0,10),
        inv.balance_due,
        inv.status
      ].join(','))
    );
    const csv = '\uFEFF' + csvRows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPDF = (rows, filename, title = 'Invoices') => {
    const html = `<!doctype html><html><head><meta charset="utf-8" />
      <title>${title}</title>
      <style>
        body{font-family: Arial, sans-serif; padding:24px}
        h1{font-size:20px;margin:0 0 12px}
        table{border-collapse:collapse;width:100%}
        th,td{border:1px solid #999;padding:8px;font-size:12px;text-align:left}
        th{background:#eee}
      </style>
    </head><body>
      <h1>${title}</h1>
      <table>
        <thead><tr>
          <th>Invoice ID</th><th>Client</th><th>Date</th><th>Balance Due</th><th>Status</th>
        </tr></thead>
        <tbody>
          ${rows.map(inv => `
            <tr>
              <td>${inv.id}</td>
              <td>${inv.client || ''}</td>
              <td>${new Date(inv.date).toDateString()}</td>
              <td>₹${Number(inv.balance_due || 0).toFixed(2)}</td>
              <td>${inv.status || ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <script>window.onload = () => { window.print(); setTimeout(()=>window.close(), 300); };</script>
    </body></html>`;
    const win = window.open('', '_blank');
    if (win) {
      win.document.open();
      win.document.write(html);
      win.document.close();
    }
  };

  return (
    <Box display="flex" height="100vh" bgcolor="#f5f5f5">
      <SideBar />
      <Box flex={1} p={3}>
        <Box bgcolor="#2196f3" color="white" p={2} borderRadius={1} mb={3}>
          <Typography variant="h5">Admin - Invoices</Typography>
        </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="All" />
          <Tab label="Outstanding" />
          <Tab label="Paid" />
        </Tabs>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" sx={{ width: '100%', maxWidth: 720 }}>
          <TextField label="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} size="small" fullWidth />
          <TextField label="From" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} size="small" InputLabelProps={{ shrink: true }} />
          <TextField label="To" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} size="small" InputLabelProps={{ shrink: true }} />
          <Button variant="outlined" onClick={() => { setSearchQuery(''); setFromDate(''); setToDate(''); }}>Reset</Button>
        </Stack>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => downloadCSV(invoices, 'invoices_all.csv')}>Download All (Excel)</Button>
        <Button variant="contained" onClick={() => downloadPDF(invoices, 'invoices_all.pdf', 'All Invoices')}>Download All (PDF)</Button>
        <Button variant="outlined" onClick={() => downloadCSV(filteredInvoices, 'invoices_filtered.csv')}>Download by Date (Excel)</Button>
        <Button variant="outlined" onClick={() => downloadPDF(filteredInvoices, 'invoices_filtered.pdf', 'Invoices (Filtered)')}>Download by Date (PDF)</Button>
      </Stack>

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
    </Box>
  );
};

export default AdminInvoices;
