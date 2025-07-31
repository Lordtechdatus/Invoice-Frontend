import React, { useState } from 'react';
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
  Divider,
  useMediaQuery,
  useTheme,
  Stack,
  Menu,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import lordtechLogo from '../assets/lordtech.png';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Invoices', href: '/invoices' },
  { label: 'Salary Slip', href: '/salary' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Login', href: '/login' },
  { label: 'Sign Up', href: '/signup' },
];

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [featuresAnchorEl, setFeaturesAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleFeaturesMenuOpen = (event) => {
    setFeaturesAnchorEl(event.currentTarget);
  };

  const handleFeaturesMenuClose = () => {
    setFeaturesAnchorEl(null);
  };

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {navLinks.map((nav) => (
          <ListItem button key={nav.label} onClick={() => navigate(nav.href)}>
            <ListItemText primary={nav.label} />
          </ListItem>
        ))}
        <ListItem>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
              color: '#fff',
              fontWeight: 700,
              borderRadius: 3,
              boxShadow: 3,
              width: '100%',
              mt: 1
            }}
            fullWidth
          >
            UPGRADE NOW
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ background: 'rgba(255,255,255,0.98)', color: 'primary.main', boxShadow: 2, borderBottom: '1px solid lightgray', height: 75 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box display="flex" alignItems="center" gap={1} sx={{ cursor: 'pointer' }} onClick={() => navigate('/') }>
          <img src={lordtechLogo} alt="LordInvoice Logo" style={{ height: 36 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', letterSpacing: 1 }}>LordInvoice</Typography>
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Stack direction="row" spacing={2} alignItems="center">
            {navLinks.map((nav) =>
              nav.label === 'Features' ? (
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
            <Button
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
                letterSpacing: 1
              }}
            >
              UPGRADE NOW
            </Button>
          </Stack>
        )}

        {/* Mobile Menu Icon */}
        {isMobile && (
          <>
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

