import { Box, Typography } from '@mui/material';
import { t } from 'i18next';

const Header = () => {
  return (
  <Box marginBottom={10}>
    <Typography mt={6} variant='h4' align='center' gutterBottom>
      {t('header.title')}
    </Typography>
    <Typography variant='subtitle1' align='center'>
      {t('header.subtitle')}
    </Typography>
  </Box>
  );
};

export default Header;