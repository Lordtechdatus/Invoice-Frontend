import React from 'react';
import { Box, Typography, Button, Container, Stack, Paper } from '@mui/material';
import { AddCircleOutline, ReceiptLong } from '@mui/icons-material';
import Footer from './Footer';

export default function Home() {
  return (
    <>
    <Container maxWidth="md">
      <Box
        sx={{
          textAlign: 'center',
          mt: 6,
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom sx={{background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)', color: 'transparent', WebkitBackgroundClip: 'text'}}>
          Invoice Generator
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Create, manage, and send invoices in seconds.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" mt={4}>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddCircleOutline />}
            href="/create-invoice"
            sx = {{borderRadius: 3}}
          >
            Create Invoice
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<ReceiptLong />}
            href="/salary"
            sx = {{borderRadius: 3}}
          >
            Create Salary Slip
          </Button>
        </Stack>

        {/* Optional Features Section */}
        <Box mt={8}>
          <Typography variant="h5" gutterBottom>
            Why Use Our Tool?
          </Typography>
          <Stack spacing={2} mt={2}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="medium">
                ⚡ Fast & Easy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Generate professional invoices in under a minute.
              </Typography>
            </Paper>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="medium">
                🧾 Organized History
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Keep track of all your invoices in one place.
              </Typography>
            </Paper>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="medium">
                🌐 Export & Share
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Download as PDF or share with clients instantly.
              </Typography>
            </Paper>
          </Stack>
        </Box>
      </Box>
    </Container>
    <Footer />
    </>
  );
}
