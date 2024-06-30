import React from 'react';
import { Box, Typography } from '@mui/material';

const ResultsHeader: React.FC = () => (
  <Box
    sx={{
     background: 'linear-gradient(to right, #1876D1, #8d72c4, #f8e082)',
      color: 'white',
      mt: 6,
      p: 2,
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
    }}
  >
    <Typography variant='h6'>Search Results</Typography>
  </Box>
);

export default ResultsHeader;