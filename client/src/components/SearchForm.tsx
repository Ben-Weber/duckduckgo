import React from 'react';
import { TextField, Button, Box } from '@mui/material';

interface SearchFormProps {
  query: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ query, onInputChange, onSubmit }) => (
  <Box component="form" onSubmit={onSubmit} display="flex" alignItems="center" mb={2}>
    <TextField
      label="Search"
      variant="outlined"
      value={query}
      onChange={onInputChange}
      fullWidth
      margin="normal"
    />
    <Button type="submit" variant="contained" color="primary" sx={{ ml: 2 }}>
      Search
    </Button>
  </Box>
);

export default SearchForm;