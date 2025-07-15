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
  Stack
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CheckIcon from '@mui/icons-material/Check';

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {['Invoices', 'Estimates', 'Expenses', 'Reports', 'More'].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Settings', 'Logout'].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <ListItem>
          <Button variant="contained" sx={{ backgroundColor: 'white', color: '#333' }} fullWidth>
            Upgrade Now
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: '#3a3a3a', boxShadow: 'none', marginBottom: '70px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box display="flex" alignItems="center" gap={1}>
          <CheckIcon />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Invoice Simple</Typography>
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Stack direction="row" spacing={2} alignItems="center">
            <Button color="inherit" sx={{ backgroundColor: '#555', borderRadius: 2, px: 2 }}>Invoices</Button>
            <Button color="inherit">Estimates</Button>
            <Button color="inherit">Expenses</Button>
            <Button color="inherit">Reports</Button>
            <Button color="inherit">More</Button>
            <Button color="inherit">Settings</Button>
            <Button color="inherit">Logout</Button>
            <Button variant="contained" sx={{ backgroundColor: 'white', color: '#333' }}>Upgrade Now</Button>
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

