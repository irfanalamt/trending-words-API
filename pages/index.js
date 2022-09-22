import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from '@mui/material';

export default function Index() {
  return (
    <Container maxWidth='sm'>
      <Box sx={{ my: 4 }}>
        <Typography variant='h1' component='h1' gutterBottom>
          Base Skeleton
        </Typography>
      </Box>
    </Container>
  );
}
