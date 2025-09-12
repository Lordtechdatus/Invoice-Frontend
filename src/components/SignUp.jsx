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
// import { useNavigate } from 'react-router-dom';
// import { signupUser } from '../api.jsx';

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       const data = await signupUser({ username, email, password });
//       if (data?.token) localStorage.setItem('token', data.token);
//       navigate('/');
//     } catch (err) {
//       setError(err?.response?.data?.message || 'Signup failed');
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
//         elevation={3}
//         sx={{
//           width: "70%",
//           p: 4,
//           mt: 1,
//           mb: 10,
//           border: "0.5px solid transparent",
//           borderRadius: 3,
//           boxShadow: 8,
//           bgcolor: "background.paper",
//           textAlign: "center",
//         }}
//       >
//         <Typography variant="h5" gutterBottom>
//           Sign Up
//         </Typography>
//         <Typography variant="body2" color="text.secondary" gutterBottom>
//           Please Sign Up to Continue
//         </Typography>

//         <Stack spacing={2} mt={2}>
//           <Button
//             variant="outlined"
//             fullWidth
//             startIcon={<FacebookIcon />}
//             sx={{ textTransform: "none", borderRadius: 3 }}
//           >
//             Sign up With Facebook
//           </Button>
//           <Button
//             variant="outlined"
//             fullWidth
//             startIcon={<GoogleIcon />}
//             href="/auth/google"
//             sx={{ textTransform: "none", borderRadius: 3 }}
//           >
//             Sign up With Google
//           </Button>
//         </Stack>

//         <Divider sx={{ my: 3 }}>Or</Divider>

//         <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Name"
//             type="text"
//             margin="normal"
//             sx={{ borderRadius: 3 }}
//             required
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
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
//                   <IconButton
//                     onClick={() => setShowPassword((prev) => !prev)}
//                     edge="end"
//                   >
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
//             {loading ? 'Signing up...' : 'Sign up'}
//           </Button>

//           <Typography variant="body2" color="text.secondary" gutterBottom>
//             Already have an account?
//             <Button
//               onClick={() => navigate("/Login")}
//               variant="text"
//               sx={{ textTransform: "none", color: "blue" }}
//             >
//               Log In
//             </Button>
//           </Typography>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default SignUp;



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
import { signupUser } from "../api.jsx";
import { useAuth } from "../utils/auth.jsx"; // ensure you've added the AuthProvider/useAuth

const SignUp = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiBase = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Backend expects { username, email, password }
      const data = await signupUser({ username: name, email, password });
      if (data?.token) {
        setToken(data.token); // updates global auth (navbar flips)
      }
      navigate("/", { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Signup failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
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
        elevation={3}
        sx={{
          width: "70%",
          p: 4,
          mt: 1,
          mb: 10,
          border: "0.5px solid transparent",
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
            sx={{ textTransform: "none", borderRadius: 3 }}
            disabled={loading}
          >
            Sign up With Facebook
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{ textTransform: "none", borderRadius: 3 }}
            onClick={handleGoogleSignup}
            disabled={loading}
          >
            Sign up With Google
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }}>Or</Divider>

        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            type="text"
            margin="normal"
            sx={{ borderRadius: 3 }}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
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
            {loading ? "Signing up..." : "Sign up"}
          </Button>

          <Typography variant="body2" color="text.secondary" gutterBottom sx={{ mt: 2 }}>
            Already have an account?
            <Button
              onClick={() => navigate("/Login")}
              variant="text"
              sx={{ textTransform: "none", color: "blue" }}
            >
              Log In
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUp;
