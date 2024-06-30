import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import { t } from 'i18next';

interface ConfirmClearDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmClearDialog: React.FC<ConfirmClearDialogProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{t('confirmClearPastQueries.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t('confirmClearPastQueries.message1')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t('confirmClearPastQueries.cancel')}
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          {t('confirmClearPastQueries.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmClearDialog;