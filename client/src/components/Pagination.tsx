import React from 'react';
import { Box, Button } from '@mui/material';
import { PaginationProps } from '../types/types';

const Pagination: React.FC<PaginationProps> = ({
  totalResults,
  resultsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  return (
    <Box display='flex' justifyContent='flex-end' mb={2} mr={2}>
      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i}
          variant={i + 1 === currentPage ? 'contained' : 'outlined'}
          onClick={() => onPageChange(i + 1)}
          sx={{ mx: 0.5 }}
        >
          {i + 1}
        </Button>
      ))}
    </Box>
  );
};

export default Pagination;
