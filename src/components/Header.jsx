// import React, { useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   useMediaQuery,
//   useTheme,
//   Stack,
//   Menu,
//   MenuItem
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { useNavigate } from 'react-router-dom';
// import lordtechLogo from '../assets/lordtech.png';

// const navLinks = [
//   { label: 'Home', href: '/' },
//   { label: 'Invoices', href: '/invoices' },
//   { label: 'Salary Slips', href: '/salary-slips' },
//   { label: 'Features', href: '/features' },
//   { label: 'Pricing', href: '/pricing' },
//   { label: 'About', href: '/about' },
//   { label: 'Contact', href: '/contact' },
//   { label: 'Login', href: '/login' },
//   { label: 'Sign Up', href: '/signup' },
// ];

// function Header() {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [featuresAnchorEl, setFeaturesAnchorEl] = useState(null);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const navigate = useNavigate();

//   const toggleDrawer = (open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }
//     setDrawerOpen(open);
//   };

//   const handleFeaturesMenuOpen = (event) => {
//     setFeaturesAnchorEl(event.currentTarget);
//   };

//   const handleFeaturesMenuClose = () => {
//     setFeaturesAnchorEl(null);
//   };

//   const drawerContent = (
//     <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
//       <List>
//         {navLinks.map((nav) => (
//           <ListItem button key={nav.label} onClick={() => navigate(nav.href)}>
//             <ListItemText primary={nav.label} />
//           </ListItem>
//         ))}
//         <ListItem>
//           <Button
//             variant="contained"
//             sx={{
//               background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
//               color: '#fff',
//               fontWeight: 700,
//               borderRadius: 3,
//               boxShadow: 3,
//               width: '100%',
//               mt: 1
//             }}
//             fullWidth
//           >
//             UPGRADE NOW
//           </Button>
//         </ListItem>
//       </List>
//     </Box>
//   );

//   return (
//     <AppBar position="static" sx={{ background: 'rgba(255,255,255,0.98)', color: 'primary.main', boxShadow: 2, borderBottom: '1px solid lightgray', height: 75 }}>
//       <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//         {/* Logo */}
//         <Box display="flex" alignItems="center" gap={1} sx={{ cursor: 'pointer' }} onClick={() => navigate('/') }>
//           <img src={lordtechLogo} alt="LordInvoice Logo" style={{ height: 36 }} />
//           <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', letterSpacing: 1 }}>LordInvoice</Typography>
//         </Box>

//         {/* Desktop Navigation */}
//         {!isMobile && (
//           <Stack direction="row" spacing={2} alignItems="center">
//             {navLinks.map((nav) =>
//               nav.label === 'Features' ? (
//                 <Button
//                   key={nav.label}
//                   color="inherit"
//                   aria-controls={featuresAnchorEl ? 'features-menu' : undefined}
//                   aria-haspopup="true"
//                   aria-expanded={featuresAnchorEl ? 'true' : undefined}
//                   onClick={handleFeaturesMenuOpen}
//                   sx={{ fontWeight: 500, textTransform: 'none' }}
//                 >
//                   {nav.label}
//                 </Button>
//               ) : (
//                 <Button
//                   key={nav.label}
//                   color="inherit"
//                   onClick={() => navigate(nav.href)}
//                   sx={{ fontWeight: 500, textTransform: 'none' }}
//                 >
//                   {nav.label}
//                 </Button>
//               )
//             )}
//             <Menu
//               id="features-menu"
//               anchorEl={featuresAnchorEl}
//               open={Boolean(featuresAnchorEl)}
//               onClose={handleFeaturesMenuClose}
//               MenuListProps={{ 'aria-labelledby': 'features-button' }}
//             >
//               <MenuItem onClick={handleFeaturesMenuClose}>Estimates</MenuItem>
//               <MenuItem onClick={handleFeaturesMenuClose}>Expenses</MenuItem>
//               <MenuItem onClick={handleFeaturesMenuClose}>Reports</MenuItem>
//             </Menu>
//             <Button
//               onClick={() => navigate('/pricing')}
//               variant="contained"
//               sx={{
//                 background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
//                 color: '#fff',
//                 fontWeight: 700,
//                 borderRadius: 3,
//                 boxShadow: 3,
//                 ml: 2,
//                 px: 3,
//                 textTransform: 'uppercase',
//                 letterSpacing: 1
//               }}
//             >
//               UPGRADE NOW
//             </Button>
//           </Stack>
//         )}

//         {/* Mobile Menu Icon */}
//         {isMobile && (
//           <>
//             <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
//               <MenuIcon />
//             </IconButton>
//             <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
//               {drawerContent}
//             </Drawer>
//           </>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default Header;




import React, { useEffect, useMemo, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Stack,
  Menu,
  MenuItem,
  Avatar,
  ListItemButton,
  ListItemIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';
import lordtechLogo from '../assets/lordtech.png';

// Auth helpers from your updated auth.js
import { isAuthenticated, getCurrentUser, logout } from '../utils/auth.jsx';

const baseLinks = [
  { label: 'Home', href: '/' },
  { label: 'Invoices', href: '/invoices' },
  { label: 'Salary Slips', href: '/salary-slips' },
  { label: 'Features', href: '/features', isMenuTrigger: true },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [featuresAnchorEl, setFeaturesAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const [authed, setAuthed] = useState(isAuthenticated());
  const [user, setUser] = useState(getCurrentUser());

  // Refresh auth state on route change and cross-tab changes
  useEffect(() => {
    setAuthed(isAuthenticated());
    setUser(getCurrentUser());
  }, [location]);

  useEffect(() => {
    const onStorage = () => {
      setAuthed(isAuthenticated());
      setUser(getCurrentUser());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event?.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  const handleFeaturesMenuOpen = (event) => setFeaturesAnchorEl(event.currentTarget);
  const handleFeaturesMenuClose = () => setFeaturesAnchorEl(null);

  const handleProfileMenuOpen = (event) => setProfileAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setProfileAnchorEl(null);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      setAuthed(false);
      setUser(null);
      handleProfileMenuClose();
      navigate('/login');
    }
  };

  const desktopLinks = useMemo(() => {
    if (!authed) {
      // not logged in: show login/signup
      return [
        ...baseLinks,
        { label: 'Login', href: '/login' },
        { label: 'Sign Up', href: '/signup' },
      ];
    }
    // logged in: hide login/signup
    return baseLinks;
  }, [authed]);

  const drawerLinks = useMemo(() => {
    if (!authed) {
      return [
        ...baseLinks.filter(l => !l.isMenuTrigger), // 'Features' menu rendered separately
        { label: 'Login', href: '/login' },
        { label: 'Sign Up', href: '/signup' },
      ];
    }
    return [
        ...baseLinks.filter(l => !l.isMenuTrigger),
        { label: 'My Profile', href: '/profile', icon: <PersonIcon fontSize="small" /> },
      ];
  }, [authed]);

  const avatarInitial = (user?.name?.[0] || user?.email?.[0] || '?').toUpperCase();

  const drawerContent = (
    <Box sx={{ width: 280 }} role="presentation" onKeyDown={toggleDrawer(false)}>
      <List sx={{ mt: 1 }}>
        {drawerLinks.map((nav) => (
          <ListItem key={nav.label} disablePadding>
            <ListItemButton
              onClick={() => {
                setDrawerOpen(false);
                navigate(nav.href);
              }}
            >
              {nav.icon ? <ListItemIcon>{nav.icon}</ListItemIcon> : null}
              <ListItemText primary={nav.label} />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Features submenu items in drawer */}
        <ListItem>
          <ListItemText primary="Features" primaryTypographyProps={{ fontWeight: 600 }} />
        </ListItem>
        {['Estimates', 'Expenses', 'Reports'].map((label) => (
          <ListItem key={label} disablePadding sx={{ pl: 2 }}>
            <ListItemButton onClick={() => setDrawerOpen(false)}>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}

        {authed && (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        )}

        <ListItem sx={{ mt: 1 }}>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
              color: '#fff',
              fontWeight: 700,
              borderRadius: 3,
              boxShadow: 3,
              width: '100%',
            }}
            fullWidth
            onClick={() => {
              setDrawerOpen(false);
              navigate('/pricing');
            }}
          >
            UPGRADE NOW
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        background: 'rgba(255,255,255,0.98)',
        color: 'primary.main',
        boxShadow: 2,
        borderBottom: '1px solid lightgray',
        height: 75,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box display="flex" alignItems="center" gap={1} sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src={lordtechLogo} alt="LordInvoice Logo" style={{ height: 36 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', letterSpacing: 1 }}>
            LordInvoice
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Stack direction="row" spacing={2} alignItems="center">
            {desktopLinks.map((nav) =>
              nav.isMenuTrigger ? (
                <Button
                  key={nav.label}
                  color="inherit"
                  aria-controls={featuresAnchorEl ? 'features-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={featuresAnchorEl ? 'true' : undefined}
                  onClick={handleFeaturesMenuOpen}
                  sx={{ fontWeight: 500, textTransform: 'none' }}
                >
                  {nav.label}
                </Button>
              ) : (
                <Button
                  key={nav.label}
                  color="inherit"
                  onClick={() => navigate(nav.href)}
                  sx={{ fontWeight: 500, textTransform: 'none' }}
                >
                  {nav.label}
                </Button>
              )
            )}

            {/* Features dropdown (desktop) */}
            <Menu
              id="features-menu"
              anchorEl={featuresAnchorEl}
              open={Boolean(featuresAnchorEl)}
              onClose={handleFeaturesMenuClose}
              MenuListProps={{ 'aria-labelledby': 'features-button' }}
            >
              <MenuItem onClick={handleFeaturesMenuClose}>Estimates</MenuItem>
              <MenuItem onClick={handleFeaturesMenuClose}>Expenses</MenuItem>
              <MenuItem onClick={handleFeaturesMenuClose}>Reports</MenuItem>
            </Menu>

            {/* Right side: Upgrade + Auth area */}
            <Button
              onClick={() => navigate('/pricing')}
              variant="contained"
              sx={{
                background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                color: '#fff',
                fontWeight: 700,
                borderRadius: 3,
                boxShadow: 3,
                ml: 2,
                px: 3,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              UPGRADE NOW
            </Button>

            {/* If authed: show avatar and My Profile menu */}
            {authed ? (
              <>
                <Button
                  color="inherit"
                  onClick={handleProfileMenuOpen}
                  startIcon={
                    <Avatar sx={{ width: 28, height: 28 }}>{avatarInitial}</Avatar>
                  }
                  sx={{ fontWeight: 600, textTransform: 'none', ml: 1 }}
                >
                  My Profile
                </Button>
                <Menu
                  id="profile-menu"
                  anchorEl={profileAnchorEl}
                  open={Boolean(profileAnchorEl)}
                  onClose={handleProfileMenuClose}
                >
                  <MenuItem
                    onClick={() => {
                      handleProfileMenuClose();
                      navigate('/profile');
                    }}
                  >
                    <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
                    My Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : null}
          </Stack>
        )}

        {/* Mobile Menu Icon */}
        {isMobile && (
          <>
            {/* If authed on mobile: quick avatar button to profile */}
            {authed && (
              <IconButton color="inherit" onClick={() => navigate('/profile')} sx={{ mr: 1 }}>
                <Avatar sx={{ width: 28, height: 28 }}>{avatarInitial}</Avatar>
              </IconButton>
            )}
            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawerContent}
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
