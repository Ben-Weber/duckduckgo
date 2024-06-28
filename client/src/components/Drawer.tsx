import React from 'react';
import { Drawer } from '@mui/material';
import PastQueries from './PastQueries';

interface DrawerComponentProps {
  drawerOpen: boolean;
  toggleDrawer: () => void;
  pastQueries: string[];
  handlePastQueryClick: (pastQuery: string) => void;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  drawerOpen,
  toggleDrawer,
  pastQueries,
  handlePastQueryClick,
}) => {
  return (
    <Drawer
      variant='persistent'
      open={drawerOpen}
      onClose={toggleDrawer}
      sx={{
        [`& .MuiDrawer-paper`]: { minWidth: '15%', boxSizing: 'border-box' },
      }}
    >
      <PastQueries
        pastQueries={pastQueries}
        onPastQueryClick={handlePastQueryClick}
      />
    </Drawer>
  );
};

export default DrawerComponent;
