// File: src/admin/AdminDashboard.jsx
import { Box, Typography, Button, Stack, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SideBar from './AdminSidePanel';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" height="100vh" bgcolor="#f5f5f5">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <Box flex={1} p={3}>
        {/* Top header bar */}
        <Box bgcolor="#2196f3" color="white" p={2} borderRadius={1} mb={3}>
          <Typography variant="h5">Admin Dashboard</Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">Quick Action</Typography>
              <Typography variant="h6" mb={2}>Invoices</Typography>
              <Button variant="contained" onClick={() => navigate('/admin/invoices')}>Open</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">Quick Action</Typography>
              <Typography variant="h6" mb={2}>Salary Slips</Typography>
              <Button variant="contained" onClick={() => navigate('/admin/salary-slips')}>Open</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">Quick Action</Typography>
              <Typography variant="h6" mb={2}>Users</Typography>
              <Button variant="contained" onClick={() => navigate('/admin/users')}>Open</Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
