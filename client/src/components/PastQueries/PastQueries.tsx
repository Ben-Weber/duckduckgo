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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { PastQueriesProps } from '../../types/types';
import { t } from 'i18next';

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  height: '100%',
  position: 'relative',
});

const TitleContainer = styled(Box)({
  position: 'sticky',
  top: 0,
  backgroundColor: '#e9eaeb',
  zIndex: 1,
  width: '100%',
  padding: '16px 0',
});

const StyledTypography = styled(Typography)({
  marginLeft: 16,
});

const ListContainer = styled(Box)({
  overflowY: 'auto',
  width: '100%',
  flex: 1,
});

const StyledListItemText = styled(ListItemText)({
  color: '#747272',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const PastQueries = ({
  pastQueries,
  handlePastQueryClick,
  handleClearQueries,
}: PastQueriesProps) => {
  return (
    <StyledBox>
      <TitleContainer>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <StyledTypography variant='h6' gutterBottom={false}>
            {t('searchResults.pastQueries')}
          </StyledTypography>
          <DeleteForeverIcon fontSize='small' color='error' onClick={handleClearQueries}/>
        </Box>
      </TitleContainer>
      <ListContainer>
        <List sx={{ width: '100%' }}>
          {pastQueries.map((pastQuery, index) => (
            <React.Fragment key={index}>
              <ListItemButton onClick={() => handlePastQueryClick(pastQuery)}>
                <StyledListItemText primary={pastQuery} />
                <Box display="flex" alignItems="center" marginLeft="1rem">
                  <ChevronRightIcon fontSize='small' color='disabled'/>
                </Box>
              </ListItemButton>
              <Divider sx={{ width: '100%' }} />
            </React.Fragment>
          ))}
        </List>
      </ListContainer>
    </StyledBox>
  );
};

export default PastQueries;
