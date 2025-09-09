// import { useState } from 'react';
// import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

// const ADMIN_USER = 'mayank@test.com';
// const ADMIN_PASS = '13579';

// function AdminLogin() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (email === ADMIN_USER && password === ADMIN_PASS) {
//       localStorage.setItem('admin_token', 'local-admin');
//       navigate('/admin');
//     } else {
//       setError('Login failed. Check your email and password.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
//         <h2 className="text-center text-3xl font-semibold text-gray-900">Login</h2>
//         <p className="text-center text-gray-500 mt-1">Welcome Admin, please Login to continue</p>

//         {/* <div className="mt-6 space-y-4">
//           <button className="w-full flex items-center justify-center gap-3 rounded-full border border-blue-200 text-blue-700 py-3 hover:bg-blue-50 transition">
//             <span className="font-medium">Login With Facebook</span>
//           </button>

//           <button className="w-full flex items-center justify-center gap-3 rounded-full border border-gray-300 text-gray-700 py-3 hover:bg-gray-50 transition">
//             <span className="font-medium">Login With Google</span>
//           </button>
//         </div> */}

//         <div className="flex items-center my-6">
//           <div className="h-px flex-1 bg-gray-200" />
//           {/* <span className="text-gray-500">Or</span> */}
//           <div className="h-px flex-1 bg-gray-200" />
//         </div>

//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-sm text-gray-700 mb-2">Email *</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-700 mb-2">Password *</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-2 my-auto h-9 px-3 rounded-lg text-gray-500 hover:text-gray-700"
//               >
//                 {showPassword ? '🙈' : '👁️'}
//               </button>
//             </div>
//           </div>

//           {error && <div className="text-red-500 text-sm">{error}</div>}

//           <button
//             type="submit"
//             className="w-full rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 shadow"
//           >
//             Login With Email And Password
//           </button>

//           <p className="text-center text-sm text-gray-600 pt-2">
//             <a href="/" className="text-blue-600 hover:underline">Back to Website</a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AdminLogin;

// // function AdminDashboard() {
// //   return <div className="p-10 text-center text-2xl">Welcome to Admin Dashboard</div>;
// // }

// // export default function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/" element={<AdminLogin />} />
// //         <Route path="/admin/dashboard" element={<AdminDashboard />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }



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
