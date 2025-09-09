import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Typography,
  Button,
  Alert,
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
import { useInvoiceContext } from './InvoiceContext';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function InvoicePage() {
  const navigate = useNavigate();
  const { invoices, deleteInvoice } = useInvoiceContext();

  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [downloadAnchorEl, setDownloadAnchorEl] = useState(null);
  const [dateMenuAnchorEl, setDateMenuAnchorEl] = useState(null);
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const handleMenuOpen = (event, invoiceId) => {
    setAnchorEl(event.currentTarget);
    setSelectedInvoiceId(invoiceId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedInvoiceId(null);
  };

  const handleMenuAction = (action) => {
    const invoice = invoices.find((inv) => inv.id === selectedInvoiceId);
    if (!invoice) return;

    switch (action) {
      case 'print':
        window.print();
        break;
      case 'download':
        navigate(`/preview`);
        break;
      case 'delete':
        deleteInvoice(invoice.id);
        break;
      case 'cash':
      case 'bank':
      case 'upi':
      case 'netbank':
      case 'cheque':
        console.log(`Marked as paid via ${action}`);
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

  const exportToPDF = (data = invoices) => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Client', 'Date', 'Balance Due']],
      body: data.map(inv => [
        inv.client || '-',
        new Date(inv.date).toLocaleDateString(),
        `₹${inv.balanceDue.toFixed(2)}`
      ]),
    });
    doc.save('invoices.pdf');
    handleDownloadMenuClose();
  };

  const exportToExcel = (data = invoices, filename = 'invoices.xlsx') => {
    const sheetData = data.map(inv => ({
      Client: inv.client || '-',
      Date: new Date(inv.date).toLocaleDateString(),
      'Balance Due': inv.balanceDue,
    }));
    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoices');
    XLSX.writeFile(workbook, filename);
    handleDownloadMenuClose();
    handleDateMenuClose();
  };

  const exportLastMonths = (months) => {
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - months);
    const filtered = invoices.filter(inv => new Date(inv.date) >= cutoff);
    exportToExcel(filtered, `invoices_last_${months}_months.xlsx`);
  };

  const exportCustomRange = () => {
    const from = new Date(customStartDate);
    const to = new Date(customEndDate);
    const filtered = invoices.filter(inv => {
      const date = new Date(inv.date);
      return date >= from && date <= to;
    });
    exportToExcel(filtered, `invoices_${customStartDate}_to_${customEndDate}.xlsx`);
    setCustomDialogOpen(false);
    handleDateMenuClose();
  };

  const filtered = invoices.filter((inv) => {
    const matchesClient = inv.client?.toLowerCase().includes(search.toLowerCase());
    const isVisible =
      tab === 0 ||
      (tab === 1 && inv.status === 'outstanding') ||
      (tab === 2 && inv.status === 'paid');
    return matchesClient && isVisible;
  });

  return (
    <Box p={3} width="80%" sx={{ ml: 20 }}>
      {/* <Alert severity="error" sx={{ mb: 3 }}>
        <Typography fontWeight="bold">0 documents left on free trial</Typography>
        Thanks for trying out Invoice Simple.
        <Typography component="span" fontWeight="bold" color="primary">
          <Button onClick={() => navigate('../pricing')}><strong>Subscribe now</strong></Button>
        </Typography>
        to create and send more documents.
      </Alert> */}

      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="All invoices" />
        <Tab label="Outstanding" />
        <Tab label="Paid" />
      </Tabs>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Search by client name"
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
          <Button variant="contained" onClick={() => navigate('../create-invoice')}>
            New Invoice
          </Button>
        </Box>
      </Box>

      <Menu
        anchorEl={downloadAnchorEl}
        open={Boolean(downloadAnchorEl)}
        onClose={handleDownloadMenuClose}
      >
        <MenuItem onClick={() => exportToPDF()}>Download as PDF</MenuItem>
        <MenuItem onClick={() => exportToExcel()}>Download as Excel</MenuItem>
      </Menu>

      <Menu
        anchorEl={dateMenuAnchorEl}
        open={Boolean(dateMenuAnchorEl)}
        onClose={handleDateMenuClose}
      >
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
          <TextField
            label="From"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={customStartDate}
            onChange={(e) => setCustomStartDate(e.target.value)}
          />
          <TextField
            label="To"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={customEndDate}
            onChange={(e) => setCustomEndDate(e.target.value)}
          />
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
              <TableCell>Invoice</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Balance Due</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((invoice) => (
              <TableRow key={invoice.id} hover>
                <TableCell>
                  <Button
                    onClick={() => navigate(`../preview`)}
                    color="inherit"
                    style={{ cursor: 'pointer', textTransform: 'none' }}
                  >
                    {invoice.id}
                  </Button>
                </TableCell>
                <TableCell>{invoice.client || '-'}</TableCell>
                <TableCell>{new Date(invoice.date).toDateString()}</TableCell>
                <TableCell align="right">
                  ₹{invoice.balanceDue.toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleMenuOpen(e, invoice.id)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No invoices found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => handleMenuAction('print')}>Print Invoice</MenuItem>
        <MenuItem onClick={() => handleMenuAction('download')}>Download PDF</MenuItem>
        <MenuItem onClick={() => handleMenuAction('delete')}>Delete Invoice</MenuItem>
        {(() => {
          const invoice = invoices.find((inv) => inv.id === selectedInvoiceId);
          if (invoice && invoice.balanceDue > 0) {
            return (
              <>
                <ListSubheader>Mark as Paid</ListSubheader>
                <Divider />
                <MenuItem onClick={() => handleMenuAction('cash')}>By Cash</MenuItem>
                <MenuItem onClick={() => handleMenuAction('bank')}>By Bank Transfer</MenuItem>
                <MenuItem onClick={() => handleMenuAction('upi')}>By UPI</MenuItem>
                <MenuItem onClick={() => handleMenuAction('netbank')}>By Net Banking</MenuItem>
                <MenuItem onClick={() => handleMenuAction('cheque')}>By Cheque</MenuItem>
              </>
            );
          }
          return null;
        })()}
      </Menu>

      <Typography mt={2} color="text.secondary">
        All your invoices are auto saved here
      </Typography>
    </Box>
  );
}

