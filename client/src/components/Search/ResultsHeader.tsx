import { Box, Typography } from '@mui/material';
import { t } from 'i18next';

const ResultsHeader = () => (
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
    <Typography variant='h6'>{t('searchResults.title')}</Typography>
  </Box>
);

export default ResultsHeader;