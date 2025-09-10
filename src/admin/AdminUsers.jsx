// File: src/admin/AdminUsers.jsx
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
  Stack,
  TextField,
} from '@mui/material';
import SideBar from './AdminSidePanel';

const API = 'http://localhost:5000';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API}/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      String(u.id).toLowerCase().includes(q) ||
      String(u.name || '').toLowerCase().includes(q) ||
      String(u.email || '').toLowerCase().includes(q)
    );
  });

  return (
    <Box display="flex" height="100vh" bgcolor="#f5f5f5">
      <SideBar />
      <Box flex={1} p={3}>
        <Box bgcolor="#2196f3" color="white" p={2} borderRadius={1} mb={3}>
          <Typography variant="h5">Admin - Users</Typography>
        </Box>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <TextField label="Search users" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} size="small" fullWidth sx={{ maxWidth: 480 }} />
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name || '-'}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    </Box>
  );
};

export default AdminUsers;
