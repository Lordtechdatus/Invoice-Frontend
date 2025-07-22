// import React, { useState } from 'react';
// import {
//   Box,
//   Tabs,
//   Tab,
//   TextField,
//   Typography,
//   Button,
//   Alert,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useInvoiceContext } from './InvoiceContext';

// export default function InvoicePage() {
//   const navigate = useNavigate();
//   const { invoices } = useInvoiceContext();
//   const [tab, setTab] = useState(0);
//   const [search, setSearch] = useState('');

//   const filtered = invoices.filter((inv) => {
//     const matchesClient = inv.client?.toLowerCase().includes(search.toLowerCase());
//     const isVisible =
//       tab === 0 ||
//       (tab === 1 && inv.status === 'outstanding') ||
//       (tab === 2 && inv.status === 'paid');
//     return matchesClient && isVisible;
//   });

//   return (
//     <Box p={3}>
//       <Alert severity="error" sx={{ mb: 3 }}>
//         <Typography fontWeight="bold">0 documents left on free trial</Typography>
//         Thanks for trying out Invoice Simple.
//         <Typography component="span" fontWeight="bold" color="primary">
//           <Button onClick={() => navigate('../pricing')}><strong>Subscribe now</strong></Button>
//         </Typography>{' '}
//         to create and send more documents.
//       </Alert>

//       <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
//         <Tab label="All invoices" />
//         <Tab label="Outstanding" />
//         <Tab label="Paid" />
//       </Tabs>

//       <Box display="flex" justifyContent="space-between" mb={2}>
//         <TextField
//           label="Search by client name"
//           variant="outlined"
//           size="small"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <Button variant="contained" onClick={() => navigate('../create-invoice')}>
//           New Invoice
//         </Button>
//       </Box>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Invoice</TableCell>
//               <TableCell>Client</TableCell>
//               <TableCell>Date</TableCell>
//               <TableCell align="right">Balance Due</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filtered.map((invoice) => (
//               <TableRow key={invoice.id}>
//                 <TableCell><Button color="black" onClick={() => navigate(`../preview/${invoice.id}`)} style={{ cursor: 'pointer' }}>{invoice.id}</Button></TableCell>
//                 <TableCell>{invoice.client || '-'}</TableCell>
//                 <TableCell>{new Date(invoice.date).toDateString()}</TableCell>
//                 <TableCell align="right">
//                   ₹{invoice.balanceDue.toFixed(2)}
//                 </TableCell>
//               </TableRow>
//             ))}
//             {filtered.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">
//                   No invoices found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Typography mt={2} color="text.secondary">
//         All your invoices are auto saved here
//       </Typography>
//     </Box>
//   );
// }



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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useInvoiceContext } from './InvoiceContext';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function InvoicePage() {
  const navigate = useNavigate();
  const { invoices, deleteInvoice } = useInvoiceContext();

  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

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
        // You could update the invoice status here if needed
        console.log(`Marked as paid via ${action}`);
        break;
      default:
        break;
    }

    handleMenuClose();
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
    <Box p={3} width='80%' sx={{ml: 20}}>
      <Alert severity="error" sx={{ mb: 3 }}>
        <Typography fontWeight="bold">0 documents left on free trial</Typography>
        Thanks for trying out Invoice Simple.
        <Typography component="span" fontWeight="bold" color="primary">
          <Button onClick={() => navigate('../pricing')}><strong>Subscribe now</strong></Button>
        </Typography>
        to create and send more documents.
      </Alert>

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
        <Button variant="contained" onClick={() => navigate('../create-invoice')}>
          New Invoice
        </Button>
      </Box>

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
        <ListSubheader>Mark as Paid</ListSubheader>
        {(() => {
          const invoice = invoices.find((inv) => inv.id === selectedInvoiceId);
          if (invoice && invoice.balanceDue > 0) {
            return (
              <>
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

