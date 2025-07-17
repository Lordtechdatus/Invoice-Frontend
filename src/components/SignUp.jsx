import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Paper
        elevation={3}
        sx={{
          width: "70%",
          p: 4,
          mt: 5,
          border: '0.5px solid transparent',
          borderRadius: 3,
          boxShadow: 8,
          bgcolor: "background.paper",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Please Sign Up to Continue
        </Typography>

        <Stack spacing={2} mt={2}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<FacebookIcon />}
            sx={{ textTransform: "none", borderRadius: 3, }}
          >
            Sign up With Facebook
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{ textTransform: "none", borderRadius: 3, }}
          >
            Sign up With Google
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }}>Or</Divider>

        <Box component="form" noValidate autoComplete="off">
            <TextField
                fullWidth
                label="Name"
                type="name"
                margin="normal"
                sx={{ borderRadius: 3 }}
                required
            />
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            sx={{ borderRadius: 3 }}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            sx={{ borderRadius: 3 }}
            required
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, textTransform: "none", borderRadius: 3, }}
          >
            Sign up 
          </Button>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Already have an account?<Button onClick={() => navigate("/SignIn")} color="blue" variant="text"
            sx={{ textTransform: "none", color: "blue" }}>Log In</Button>
            </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUp;
