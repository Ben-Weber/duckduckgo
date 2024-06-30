import React from 'react';
import { Box, Typography } from '@mui/material';

const Header: React.FC = () => (
  <Box>
    <Typography mt={6} variant='h4' align='center' gutterBottom>
      The search engine you've been looking for
    </Typography>
    <Typography variant='subtitle1' align='center'>
      All-in-one relevance, lightning-fast setup and unprecedented control.
    </Typography>
  </Box>
);

export default Header;