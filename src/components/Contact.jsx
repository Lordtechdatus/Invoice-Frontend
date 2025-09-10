import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Contact = () => {
  return (
	<Container maxWidth="md">
		<Box sx={{
          textAlign: 'center',
          mt: 12,
        }}>
			<Typography variant="h2" fontWeight="bold" gutterBottom sx={{background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)', color: 'transparent', WebkitBackgroundClip: 'text'}}>
				Page Under Construction...
			</Typography>
		</Box>
	</Container>
  )
}

export default Contact;
