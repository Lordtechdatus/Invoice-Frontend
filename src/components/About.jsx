import React from "react";
import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const About = () => {
  const theme = useTheme();
  useMediaQuery(theme.breakpoints.down("sm")); // Only for responsive padding, no need to store

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        py: { xs: 4, md: 8 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: { xs: 3, md: 6 },
          mt: 8,
          borderRadius: 5,
          maxWidth: 700,
          width: 1,
          mb: 6,
          textAlign: "center",
          background: "rgba(255,255,255,0.97)",
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Typography variant="h3" fontWeight="bold" color="primary.main" gutterBottom>
            About LordInvoice
          </Typography>
          <Typography variant="h6" color="text.secondary">
            LordInvoice is your modern solution for effortless invoicing. Designed for freelancers, small businesses, and professionals, our platform makes creating, sending, and managing invoices simple and beautiful.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default About; 