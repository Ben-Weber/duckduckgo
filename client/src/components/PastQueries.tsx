import React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
  styled,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { PastQueriesProps } from '../types/types';

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  height: '100%',
  position: 'relative',
  overflow: 'scroll',
});

const StyledTypography = styled(Typography)({
  marginLeft: 16,
  marginTop: 16,
});

const PastQueries: React.FC<PastQueriesProps> = ({
  pastQueries,
  handlePastQueryClick,
}) => {
  return (
    <StyledBox>
      <StyledTypography variant='h6' gutterBottom={false}>
        Past Queries
      </StyledTypography>
      <List sx={{ width: '100%' }}>
        {pastQueries.map((pastQuery, index) => (
          <React.Fragment key={index}>
            <ListItemButton onClick={() => handlePastQueryClick(pastQuery)}>
              <ListItemText
                primary={pastQuery}
                sx={{ color: '#747272', fontWeight: 'bold' }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ChevronRightIcon fontSize='small' color='disabled' />
              </Box>
            </ListItemButton>
            <Divider sx={{ width: '100%' }} />
          </React.Fragment>
        ))}
      </List>
    </StyledBox>
  );
};

export default PastQueries;
