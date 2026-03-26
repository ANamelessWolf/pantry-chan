import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import t from '../../constants/translations/food.json';
import './food.scss';

const lang = 'en';

function DeleteFoodConfirmModal({ open, onClose, onConfirm, food, loading }) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: '16px' } }}
    >
      <DialogContent sx={{ pt: 4, pb: 2, textAlign: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <WarningAmberIcon className="delete-confirm__icon" />

          <Typography variant="h6" fontWeight={800} color="text.primary">
            {t[lang].confirmDeleteTitle}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            lineHeight={1.65}
            maxWidth={280}
          >
            {t[lang].confirmDeleteMessage}{' '}
            <Typography component="span" className="delete-confirm__food-name">
              "{food?.name}"
            </Typography>
            ?
            <br />
            <Typography
              component="span"
              variant="caption"
              color="text.disabled"
            >
              This action cannot be undone.
            </Typography>
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1.5 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={onClose}
          disabled={loading}
          sx={{
            textTransform: 'none',
            borderRadius: '8px',
            color: '#64748b',
            borderColor: '#cbd5e1',
            '&:hover': { borderColor: '#94a3b8', backgroundColor: '#f8fafc' },
          }}
        >
          {t[lang].cancel}
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={loading}
          sx={{
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': { boxShadow: '0 2px 8px rgba(211,47,47,0.3)' },
          }}
        >
          {loading ? (
            <CircularProgress size={18} color="inherit" />
          ) : (
            t[lang].delete
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteFoodConfirmModal;
