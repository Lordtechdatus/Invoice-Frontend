// File: src/admin/AdminDashboard.jsx
import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Stack spacing={2} direction="row" mt={3}>
        <Button variant="contained" onClick={() => navigate('/admin/invoices')}>
          Manage Invoices
        </Button>
        <Button variant="outlined" onClick={() => navigate('/admin/users')}>
          View Users
        </Button>
      </Stack>

      <Typography variant="body2" mt={4} color="text.secondary">
        More admin tools coming soon...
      </Typography>
    </Box>
  );
};

export default AdminDashboard;
