import React from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';

interface PastQueriesProps {
  pastQueries: string[];
  onPastQueryClick: (pastQuery: string) => void;
}

const PastQueries: React.FC<PastQueriesProps> = ({ pastQueries, onPastQueryClick }) => {
  return (
    <Box mb={2}>
      <Typography variant="h6">Past Queries</Typography>
      <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
        <List>
          {pastQueries.map((pastQuery, index) => (
            <ListItem button key={index} onClick={() => onPastQueryClick(pastQuery)}>
              <ListItemText primary={pastQuery} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default PastQueries;
