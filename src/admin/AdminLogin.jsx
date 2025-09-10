import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  CssBaseline,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ADMIN_USER = 'm@test.com';
const ADMIN_PASS = '13579';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem('admin_token', 'local-admin');
      navigate('/admin');
    } else {
      setError('Login failed. Check your email and password.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '80vh', display: 'grid', placeItems: 'center' }}>
      <CssBaseline />
      <Paper elevation={8} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 3, width: '100%' }}>
        <Typography variant="h4" align="center" fontWeight={600} gutterBottom>
          Login
        </Typography>
        <Typography align="center" color="text.secondary" sx={{ mb: 3 }}>
          Welcome Admin, please Login to continue
        </Typography>

        <Stack direction="row" alignItems="center" sx={{ my: 3 }}>
          <Divider sx={{ flex: 1 }} />
          <Divider sx={{ flex: 1 }} />
        </Stack>

        <Box component="form" onSubmit={handleLogin} noValidate>
          <Stack spacing={2.5}>
            <TextField
              label="Email *"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />

            <TextField
              label="Password *"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword((s) => !s)} edge="end" aria-label="toggle password visibility">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}

            <Button type="submit" variant="contained" sx={{ borderRadius: 10, py: 1.2 }}>
              Login With Email And Password
            </Button>

            <Typography align="center" variant="body2" color="text.secondary">
              <Link href="/" underline="hover">
                Back to Website 
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}

export default AdminLogin;
