// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   Divider,
//   TextField,
//   Typography,
//   Paper,
//   Stack,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GoogleIcon from "@mui/icons-material/Google";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../api.jsx";

// const LogIn = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleTogglePassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const data = await loginUser({ email, password });
//       // optionally store token
//       if (data?.token) localStorage.setItem('token', data.token);
//       navigate("/", { replace: true });
//     } catch (err) {
//       setError(err?.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Paper
//         elevation={1}
//         sx={{
//           width: "70%",
//           p: 4,
//           border: "0.5px solid transparent",
//           borderRadius: 3,
//           boxShadow: 8,
//           bgcolor: "background.paper",
//           textAlign: "center",
//           mb: 10,
//         }}
//       >
//         <Typography variant="h5" gutterBottom>
//           Login
//         </Typography>
//         <Typography variant="body2" color="text.secondary" gutterBottom>
//           Welcome user, please Login to continue
//         </Typography>

//         <Stack spacing={2} mt={2}>
//           <Button
//             variant="outlined"
//             fullWidth
//             startIcon={<FacebookIcon />}
//             sx={{ textTransform: "none", borderRadius: 3 }}
//           >
//             Login With Facebook
//           </Button>
//           <Button
//             variant="outlined"
//             fullWidth
//             startIcon={<GoogleIcon />}
//             sx={{ textTransform: "none", borderRadius: 3 }}
//           >
//             Login With Google
//           </Button>
//         </Stack>

//         <Divider sx={{ my: 3 }}>Or</Divider>

//         <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Email"
//             type="email"
//             margin="normal"
//             sx={{ borderRadius: 3 }}
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             label="Password"
//             type={showPassword ? "text" : "password"}
//             margin="normal"
//             sx={{ borderRadius: 3 }}
//             required
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={handleTogglePassword} edge="end">
//                     {showPassword ? <Visibility /> : <VisibilityOff />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {error && (
//             <Typography color="error" variant="body2">{error}</Typography>
//           )}
//           <Button
//             fullWidth
//             variant="contained"
//             sx={{ mt: 2, textTransform: "none", borderRadius: 3 }}
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? 'Logging in...' : 'Login With Email And Password'}
//           </Button>

//           <Typography variant="body2" color="text.secondary" gutterBottom>
//             Didn't have an account?
//             <Button
//               onClick={() => navigate("/SignUp")}
//               variant="text"
//               sx={{ textTransform: "none", color: "blue" }}
//             >
//               Sign up
//             </Button>
//           </Typography>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default LogIn;



import React, { useState } from "react";
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
import { loginUser } from "../api.jsx";
// If you've added the AuthProvider/useAuth as suggested:
import { useAuth } from "../utils/auth.jsx"; // make sure this exists per previous step

const LogIn = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth(); // sets global auth so navbar updates
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiBase = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      if (data?.token) {
        // Update global auth (navbar flips) and persist
        setToken(data.token);
        // If you still want localStorage direct write, it's handled by AuthProvider.
        // localStorage.setItem('token', data.token);
      }
      navigate("/", { replace: true });
    } catch (err) {
      // Handle both axios-style and fetch-style errors
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Full redirect to backend which starts OAuth and then redirects back with ?token=
    window.location.href = `${apiBase}/auth/google`;
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
            disabled={loading}
          >
            Login With Facebook
          </Button>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{ textTransform: "none", borderRadius: 3 }}
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            Login With Google
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }}>Or</Divider>

        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            sx={{ borderRadius: 3 }}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
                  <IconButton onClick={handleTogglePassword} edge="end" aria-label="toggle password">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, textTransform: "none", borderRadius: 3 }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login With Email And Password"}
          </Button>

          <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
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
