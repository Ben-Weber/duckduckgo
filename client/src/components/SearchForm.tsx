import React from 'react';
import { Button, Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchFormProps } from '../types/types';
import { t } from 'i18next';

const SearchForm: React.FC<SearchFormProps> = ({
  query,
  onInputChange,
  onSubmit,
}) => (
  <Box component='form' onSubmit={onSubmit} display='flex'>
    <TextField
      id='outlined-basic'
      label={t('searchForm.placeholder')}
      variant='outlined'
      value={query}
      onChange={onInputChange}
      fullWidth
    />
    <Button
      type='submit'
      variant='contained'
      endIcon={<SearchIcon />}
      sx={{ ml: 2, px: 5 }}
    >
      {t('searchForm.button')}
    </Button>
  </Box>
);

export default SearchForm;
