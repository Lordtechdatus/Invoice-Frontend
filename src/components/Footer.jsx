// File: src/components/Footer.jsx
import {
    Box,
    Typography,
    Grid,
    Link,
    Button,
    IconButton,
    Stack,
  } from '@mui/material';
  import FacebookIcon from '@mui/icons-material/Facebook';
  import LinkedInIcon from '@mui/icons-material/LinkedIn';
  import TwitterIcon from '@mui/icons-material/Twitter';
  import YouTubeIcon from '@mui/icons-material/YouTube';
  import lordtechLogo from '../assets/lordtech.png';
  
  const Footer = () => {

    const date = new Date();
    const year = date.getFullYear();

    return (
    <>  
      <Box
      display='flex'
      justifyContent='space-evenly'
        sx={{
          backgroundColor: '#fff',
          borderTop: '1px solid lightgray',
          py: 4,
          px: { xs: 2, md: 10 },
          mt: 10,
        }}
      >
        <Grid container spacing={4}>
          {/* Logo & Socials */}
          <Grid item xs={12} md={3}>
            <Box display="flex" alignItems="center" mb={1}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 1,
                  mr: 1,
                }}
              > 
                <img src={lordtechLogo} alt="LordTech Logo" style={{ height: 32 }} />
              </Box>
              <Typography variant="h6" fontWeight="bold" sx={{ ml: 2 }}>
                LordInvoice
              </Typography>
            </Box>
            <Typography fontSize="14px" color="text.secondary" mb={2}>
              Invoice your customers in seconds.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton><FacebookIcon /></IconButton>
              <IconButton><LinkedInIcon /></IconButton>
              <IconButton><TwitterIcon /></IconButton>
              <IconButton><YouTubeIcon /></IconButton>
            </Stack>
          </Grid>
  
          {/* Product */}
          <Grid item xs={6} md={2}>
            <Typography fontWeight="bold" mb={1}>Product</Typography>
            <Stack spacing={0.5}>
              <Link style={{textDecoration: 'none'}} href="/create-invoice">Online Invoice Generator</Link>
              <Link style={{textDecoration: 'none'}} href="#">Receipt Maker</Link>
              <Link style={{textDecoration: 'none'}} href="#">Estimate Maker</Link>
              <Link style={{textDecoration: 'none'}} href="#">Features</Link>
              <Link style={{textDecoration: 'none'}} href="/pricing">Pricing</Link>
              <Link style={{textDecoration: 'none'}} href="/login">Login ↗</Link>
            </Stack>
          </Grid>
  
          {/* Resources */}
          <Grid item xs={6} md={2}>
            <Typography fontWeight="bold" mb={1}>Resources</Typography>
            <Stack spacing={0.5}>
              <Link style={{textDecoration: 'none'}} href="#">Invoice Templates</Link>
              <Link style={{textDecoration: 'none'}} href="#">Receipt Template</Link>
              <Link style={{textDecoration: 'none'}} href="#">Profit Margin Calculator</Link>
              <Link style={{textDecoration: 'none'}} href="#">Our Blog</Link>
              <Link style={{textDecoration: 'none'}} href="#">Support ↗</Link>
            </Stack>
          </Grid>
  
          {/* Company */}
          <Grid item xs={6} md={2}>
            <Typography fontWeight="bold" mb={1}>Company</Typography>
            <Stack spacing={0.5}>
              <Link style={{textDecoration: 'none'}} href="/about">About</Link>
              <Link style={{textDecoration: 'none'}} href="#">Customers</Link>
              <Link style={{textDecoration: 'none'}} href="/contact">Contact</Link>
              <Link style={{textDecoration: 'none'}} href="/admin/login">Admin</Link>
            </Stack>
          </Grid>
  
          {/* CTA */}
          <Grid item xs={6} md={3}>
            <Typography fontWeight="bold" mb={1}>Get Started</Typography>
            <Button variant="contained" fullWidth sx={{ mb: 1, background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)' }}>
              TRY IT FREE ↗
            </Button>
            {/* <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_logo_black.svg"
              alt="App Store"
              style={{ height: 40, marginBottom: 8 }}
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              style={{ height: 40 }}
            /> */}
          </Grid>
        </Grid>
      </Box>
      {/* Bottom Copyright */}
      <Box mt={4} textAlign="center" fontSize="14px" color="text.secondary">
          © {year} <strong>Invoice Simple</strong>. <Link>Privacy Policy</Link> ·{' '}
          <Link>Terms of Service</Link>  {/* TODO: Add Links to Privacy Policy and Terms of Services*/}
        </Box>
      </>
    );
  };
  
  export default Footer;
  