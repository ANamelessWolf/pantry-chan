import React from 'react';
import { Box, Typography, Skeleton, Button, Alert } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import FoodCard from './FoodCard';
import t from '../../constants/translations/food.json';
import './food.scss';

const lang = 'en';

function SkeletonCard() {
  return (
    <Box className="food-skeleton-card">
      <Skeleton variant="rectangular" height={158} />
      <Box sx={{ p: '14px 16px 10px', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Skeleton variant="text" width="68%" height={22} />
        <Skeleton variant="text" width="38%" height={18} />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6px',
            mt: 0.5,
          }}
        >
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height={46}
              sx={{ borderRadius: '8px' }}
            />
          ))}
        </Box>
      </Box>
      <Box sx={{ px: 2, pb: 1.5, pt: 1, borderTop: '1px solid #f1f5f9' }}>
        <Skeleton variant="text" width="50%" height={16} />
      </Box>
    </Box>
  );
}

function FoodCatalog({ foods, loading, error, onEdit, onDelete, onShow, onRetry }) {
  if (loading) {
    return (
      <Box className="food-catalog__grid">
        {[...Array(8)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="food-catalog__error-state">
        <Alert
          severity="error"
          sx={{ maxWidth: 500, width: '100%', borderRadius: '10px' }}
        >
          {error}
        </Alert>
        <Button
          variant="outlined"
          color="error"
          startIcon={<RefreshIcon />}
          onClick={onRetry}
          sx={{ textTransform: 'none', borderRadius: '8px' }}
        >
          Try again
        </Button>
      </Box>
    );
  }

  if (!foods.length) {
    return (
      <Box className="food-catalog__empty-state">
        <RestaurantMenuIcon className="empty-icon" />
        <Typography variant="h6" fontWeight={700} color="text.secondary">
          {t[lang].noFoodsFound}
        </Typography>
        <Typography variant="body2" color="text.disabled" maxWidth={340}>
          {t[lang].noFoodsMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="food-catalog__grid">
      {foods.map((food) => (
        <FoodCard
          key={food.id}
          food={food}
          onEdit={onEdit}
          onDelete={onDelete}
          onShow={onShow}
        />
      ))}
    </Box>
  );
}

export default FoodCatalog;
