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
  Tabs,
  Tab,
  Stack,
  TextField,
  Button,
} from '@mui/material';
import SideBar from './AdminSidePanel';

const API = 'http://localhost:5000';

const AdminSalarySlips = () => {
  const [salarySlips, setSalarySlips] = useState([]);
  const [tab, setTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    const fetchSalarySlips = async () => {
      try {
        const res = await axios.get(`${API}/admin/salary-slips`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSalarySlips(res.data);
      } catch (err) {
        console.error('Failed to fetch salary slips:', err);
      }
    };
    fetchSalarySlips();
  }, []);

  const matchesTab = (s) => (tab === 0 ? true : tab === 1 ? s.status === 'pending' : s.status === 'processed');
  const matchesSearch = (s) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      String(s.id).toLowerCase().includes(q) ||
      String(s.employee || '').toLowerCase().includes(q) ||
      String(s.month || '').toLowerCase().includes(q) ||
      String(s.status || '').toLowerCase().includes(q)
    );
  };
  const isInDateRange = (s) => {
    if (!fromDate && !toDate) return true;
    const d = new Date(s.date || s.month);
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

  const filteredSlips = salarySlips.filter((s) => matchesTab(s) && matchesSearch(s) && isInDateRange(s));

  const downloadCSV = (rows, filename) => {
    const header = ['Slip ID','Employee','Month','Net Pay','Status'];
    const csvRows = [header.join(',')].concat(
      rows.map((s) => [
        s.id,
        `"${(s.employee || '').toString().replace(/"/g,'""')}"`,
        s.month,
        s.net_pay,
        s.status
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

  const downloadPDF = (rows, filename, title = 'Salary Slips') => {
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
          <th>Slip ID</th><th>Employee</th><th>Month</th><th>Net Pay</th><th>Status</th>
        </tr></thead>
        <tbody>
          ${rows.map(s => `
            <tr>
              <td>${s.id}</td>
              <td>${s.employee || ''}</td>
              <td>${s.month || ''}</td>
              <td>₹${Number(s.net_pay || 0).toFixed(2)}</td>
              <td>${s.status || ''}</td>
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
          <Typography variant="h5">Admin - Salary Slips</Typography>
        </Box>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            <Tab label="All" />
            <Tab label="Pending" />
            <Tab label="Processed" />
          </Tabs>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" sx={{ width: '100%', maxWidth: 720 }}>
            <TextField label="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} size="small" fullWidth />
            <TextField label="From" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} size="small" InputLabelProps={{ shrink: true }} />
            <TextField label="To" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} size="small" InputLabelProps={{ shrink: true }} />
            <Button variant="outlined" onClick={() => { setSearchQuery(''); setFromDate(''); setToDate(''); }}>Reset</Button>
          </Stack>
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }}>
          <Button variant="contained" onClick={() => downloadCSV(salarySlips, 'salary_slips_all.csv')}>Download All (Excel)</Button>
          <Button variant="contained" onClick={() => downloadPDF(salarySlips, 'salary_slips_all.pdf', 'All Salary Slips')}>Download All (PDF)</Button>
          <Button variant="outlined" onClick={() => downloadCSV(filteredSlips, 'salary_slips_filtered.csv')}>Download by Date (Excel)</Button>
          <Button variant="outlined" onClick={() => downloadPDF(filteredSlips, 'salary_slips_filtered.pdf', 'Salary Slips (Filtered)')}>Download by Date (PDF)</Button>
        </Stack>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Slip ID</TableCell>
                <TableCell>Employee</TableCell>
                <TableCell>Month</TableCell>
                <TableCell align="right">Net Pay</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSlips.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.id}</TableCell>
                  <TableCell>{s.employee}</TableCell>
                  <TableCell>{s.month}</TableCell>
                  <TableCell align="right">₹{Number(s.net_pay || 0).toFixed(2)}</TableCell>
                  <TableCell align="right">{s.status}</TableCell>
                </TableRow>
              ))}
              {filteredSlips.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">No salary slips found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminSalarySlips;


