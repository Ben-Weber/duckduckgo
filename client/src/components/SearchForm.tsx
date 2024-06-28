import React from 'react';
import { Button, Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchFormProps } from '../types/types';

const SearchForm: React.FC<SearchFormProps> = ({
  query,
  onInputChange,
  onSubmit,
}) => (
  <Box
    component='form'
    onSubmit={onSubmit}
    display='flex'
  >
    <InputBase
      placeholder='Search...'
      value={query}
      onChange={onInputChange}
      fullWidth
      sx={{
        marginLeft: '10px',
        flex: 1,
        '& .MuiInputBase-input': {
          padding: '10px 0',
        },
      }}
    />
    <Button type='submit' variant='contained' color='primary' sx={{ ml: 2 }}>
      <SearchIcon />
    </Button>
  </Box>
);

export default SearchForm;
