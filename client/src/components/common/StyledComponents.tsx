import React from 'react';
import { Box } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';

export const ResultsBox = ({ children }: { children: React.ReactNode }) => {
  const { isMobile } = useResponsive();

  return (
    <Box
      display='flex'
      justifyContent={'center'}
      border='1px solid #1875d14f'
      boxShadow='0px 0px 10px 0px #1875d14f'
      sx={{
        borderBottomLeftRadius: 7,
        borderBottomRightRadius: 7,
        backgroundColor: '#ffffff8b',
        width: '100%',
        flexDirection: isMobile ? 'column' : 'row',
      }}
      maxHeight={isMobile ? '' : '600px'}
    >
      {children}
    </Box>
  );
};

export const NoResultsBox = ({ children }: { children: React.ReactNode }) => (
  <Box
    display='flex'
    justifyContent={'center'}
    alignItems={'center'}
    mt={6}
    border='1px solid #1875d14f'
    borderRadius={1}
    boxShadow='0px 0px 10px 0px #1875d14f'
    height={150}
    style={{ backgroundColor: '#ffffff8b' }}
    width='100%'
  >
    {children}
  </Box>
);
