import { useMediaQuery, useTheme } from '@mui/material';

const useResponsive = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return { isMobile };
};

export default useResponsive;