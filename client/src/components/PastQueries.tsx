import React from 'react';
import { List, ListItemButton, ListItemText, Typography, Box } from '@mui/material';
import { PastQueriesProps } from '../types/types';

const PastQueries: React.FC<PastQueriesProps> = ({ pastQueries, onPastQueryClick }) => {
  return (
    <Box mb={2}>
      <Typography variant="h6">Past Queries</Typography>
      <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
        <List>
          {pastQueries.map((pastQuery, index) => (
            <ListItemButton key={index} onClick={() => onPastQueryClick(pastQuery)}>
              <ListItemText primary={pastQuery} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default PastQueries;
