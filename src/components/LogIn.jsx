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
  IconButton,
  InputAdornment,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={1}
        sx={{
          width: "70%",
          p: 4,
          border: "0.5px solid transparent",
          borderRadius: 3,
          boxShadow: 8,
          bgcolor: "background.paper",
          textAlign: "center",
          mb: 10,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Welcome user, please Login to continue
        </Typography>

        <Stack spacing={2} mt={2}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<FacebookIcon />}
            sx={{ textTransform: "none", borderRadius: 3 }}
          >
            Login With Facebook
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{ textTransform: "none", borderRadius: 3 }}
          >
            Login With Google
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }}>Or</Divider>

        <Box component="form" noValidate autoComplete="off">
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
            type={showPassword ? "text" : "password"}
            margin="normal"
            sx={{ borderRadius: 3 }}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, textTransform: "none", borderRadius: 3 }}
          >
            Login With Email And Password
          </Button>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Didn't have an account?
            <Button
              onClick={() => navigate("/SignUp")}
              variant="text"
              sx={{ textTransform: "none", color: "blue" }}
            >
              Sign up
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LogIn;
