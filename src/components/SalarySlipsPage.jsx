import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  ListSubheader,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { useSalarySlipContext } from './SalarySlipContext';

export default function SalarySlipPage() {
  const navigate = useNavigate();
  const { slips, deleteSlip } = useSalarySlipContext();

  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSlipId, setSelectedSlipId] = useState(null);
  const [downloadAnchorEl, setDownloadAnchorEl] = useState(null);
  const [dateMenuAnchorEl, setDateMenuAnchorEl] = useState(null);
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const handleMenuOpen = (event, slipId) => {
    setAnchorEl(event.currentTarget);
    setSelectedSlipId(slipId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSlipId(null);
  };

  const handleMenuAction = (action) => {
    const slip = slips.find((s) => s.id === selectedSlipId);
    if (!slip) return;

    switch (action) {
      case 'print':
        window.print();
        break;
      case 'download':
        navigate(`/salary-slips/preview`);
        break;
      case 'delete':
        deleteSlip(slip.id);
        break;
      default:
        break;
    }

    handleMenuClose();
  };

  const handleDownloadMenuOpen = (event) => {
    setDownloadAnchorEl(event.currentTarget);
  };

  const handleDownloadMenuClose = () => {
    setDownloadAnchorEl(null);
  };

  const handleDateMenuOpen = (event) => {
    setDateMenuAnchorEl(event.currentTarget);
  };

  const handleDateMenuClose = () => {
    setDateMenuAnchorEl(null);
  };

  const exportToPDF = (data = slips) => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Employee', 'Date', 'Net Pay']],
      body: data.map((s) => [
        s.employee || '-',
        new Date(s.date).toLocaleDateString(),
        `₹${Number(s.netPay || 0).toFixed(2)}`,
      ]),
    });
    doc.save('salary_slips.pdf');
    handleDownloadMenuClose();
  };

  const exportToExcel = (data = slips, filename = 'salary_slips.xlsx') => {
    const sheetData = data.map((s) => ({
      Employee: s.employee || '-',
      Date: new Date(s.date).toLocaleDateString(),
      'Net Pay': Number(s.netPay || 0),
    }));
    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SalarySlips');
    XLSX.writeFile(workbook, filename);
    handleDownloadMenuClose();
    handleDateMenuClose();
  };

  const exportLastMonths = (months) => {
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - months);
    const filtered = slips.filter((s) => new Date(s.date) >= cutoff);
    exportToExcel(filtered, `salary_slips_last_${months}_months.xlsx`);
  };

  const exportCustomRange = () => {
    const from = new Date(customStartDate);
    const to = new Date(customEndDate);
    const filtered = slips.filter((s) => {
      const d = new Date(s.date);
      return d >= from && d <= to;
    });
    exportToExcel(filtered, `salary_slips_${customStartDate}_to_${customEndDate}.xlsx`);
    setCustomDialogOpen(false);
    handleDateMenuClose();
  };

  const filtered = slips.filter((s) => {
	const matchesEmployee = (s.employee || '').toLowerCase().includes(search.toLowerCase());
    const isVisible =
      tab === 0 ||
      (tab === 1 && s.status === 'pending') ||
      (tab === 2 && s.status === 'paid');
    return matchesEmployee && isVisible;
  });

  return (
    <Box p={3} width="80%" sx={{ ml: 20 }}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="All salary slips" />
        <Tab label="Pending" />
        <Tab label="Paid" />
      </Tabs>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Search by employee name"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Box>
          <Button variant="outlined" onClick={handleDownloadMenuOpen} sx={{ mr: 2 }}>
            Download All
          </Button>
          <Button variant="outlined" onClick={handleDateMenuOpen} sx={{ mr: 2 }}>
            Download via Date
          </Button>
          <Button variant="contained" onClick={() => navigate('/salary')}>
            New Salary Slip
          </Button>
        </Box>
      </Box>

      <Menu anchorEl={downloadAnchorEl} open={Boolean(downloadAnchorEl)} onClose={handleDownloadMenuClose}>
        <MenuItem onClick={() => exportToPDF()}>Download as PDF</MenuItem>
        <MenuItem onClick={() => exportToExcel()}>Download as Excel</MenuItem>
      </Menu>

      <Menu anchorEl={dateMenuAnchorEl} open={Boolean(dateMenuAnchorEl)} onClose={handleDateMenuClose}>
        <MenuItem onClick={() => exportLastMonths(1)}>Last 1 Month</MenuItem>
        <MenuItem onClick={() => exportLastMonths(2)}>Last 2 Months</MenuItem>
        <MenuItem onClick={() => exportLastMonths(3)}>Last 3 Months</MenuItem>
        <Divider />
        <MenuItem onClick={() => { setCustomDialogOpen(true); handleDateMenuClose(); }}>
          Custom Date Range
        </MenuItem>
      </Menu>

      <Dialog open={customDialogOpen} onClose={() => setCustomDialogOpen(false)}>
        <DialogTitle>Select Custom Date Range</DialogTitle>
        <DialogContent>
          <TextField label="From" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} value={customStartDate} onChange={(e) => setCustomStartDate(e.target.value)} />
          <TextField label="To" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} value={customEndDate} onChange={(e) => setCustomEndDate(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCustomDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={exportCustomRange}>Download Excel</Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Slip</TableCell>
              <TableCell>Employee</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Net Pay</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((slip) => (
              <TableRow key={slip.id} hover>
                <TableCell>
                  <Button onClick={() => navigate(`../salary-slips/preview`)} color="inherit" sx={{ textTransform: 'none' }}>
                    {slip.id}
                  </Button>
                </TableCell>
                <TableCell>{slip.employee || '-'}</TableCell>
                <TableCell>{new Date(slip.date).toDateString()}</TableCell>
                <TableCell align="right">₹{Number(slip.netPay || 0).toFixed(2)}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleMenuOpen(e, slip.id)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">No salary slips found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuItem onClick={() => handleMenuAction('print')}>Print Slip</MenuItem>
        <MenuItem onClick={() => handleMenuAction('download')}>Download PDF</MenuItem>
        <MenuItem onClick={() => handleMenuAction('delete')}>Delete Slip</MenuItem>
        {(() => {
          const s = slips.find((slip) => slip.id === selectedSlipId);
          if (s && s.status !== 'paid') {
            return (
              <>
                <ListSubheader>Mark as Paid</ListSubheader>
                <Divider />
                <MenuItem onClick={() => handleMenuAction('paid')}>Mark Paid</MenuItem>
              </>
            );
          }
          return null;
        })()}
      </Menu>

      <Typography mt={2} color="text.secondary">All your salary slips are auto saved here</Typography>
    </Box>
  );
}