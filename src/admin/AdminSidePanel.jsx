import React from 'react';
import { Box, Typography, Divider, List, ListItemButton, Button, Link, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SideBar() {
  const navigate = useNavigate();
  return (
	<Box
        sx={{
          width: 240,
          bgcolor: '#0d1b2a',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2}}>
          Admin Panel
        </Typography>
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', mb: 0 }} />

        <List>
          <ListItemButton onClick={() => navigate('/admin')}>
              <ListItemText primary="Dashboard" />
          </ListItemButton>
        </List>
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', mb: 2 }} />

        <Typography variant="body2" sx={{ color: 'gray', mb: 1 }}>
          Manage
        </Typography>
        <List>
          <ListItemButton onClick={() => navigate('/admin/invoices')}>
            <ListItemText primary="Invoices" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/admin/salary-slips')}>
            <ListItemText primary="Salary Slips" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/admin/users')}>
            <ListItemText primary="Users" />
          </ListItemButton>
        </List>

        <Link href="/admin/login" fullWidth sx={{ mt: 35, textDecoration: "none" }}><Button sx={{ fontSize: "18px" }}>Logout</Button></Link>

      </Box>
  )
}

export default SideBar;