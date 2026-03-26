import React from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import t from '../../constants/translations/food.json';
import './food.scss';

const lang = 'en';

function FoodFilters({
  search,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  categories,
  onClear,
}) {
  const hasActiveFilters = !!search || !!categoryFilter;

  return (
    <Box className="food-filters">
      <TextField
        className="food-filters__search"
        placeholder={t[lang].searchPlaceholder}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
          endAdornment: search ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => onSearchChange('')}
                edge="end"
                aria-label="Clear search"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: '#f8fafc',
            '&:hover fieldset': { borderColor: '#94a3b8' },
          },
        }}
      />

      <FormControl size="small" className="food-filters__category-select">
        <InputLabel>{t[lang].filterByCategory}</InputLabel>
        <Select
          value={categoryFilter}
          label={t[lang].filterByCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          sx={{
            borderRadius: '8px',
            backgroundColor: '#f8fafc',
          }}
        >
          <MenuItem value="">
            <em>{t[lang].allCategories}</em>
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {hasActiveFilters && (
        <Button
          size="small"
          variant="text"
          onClick={onClear}
          startIcon={<ClearIcon />}
          sx={{
            color: '#64748b',
            textTransform: 'none',
            whiteSpace: 'nowrap',
            borderRadius: '8px',
            '&:hover': { backgroundColor: '#f1f5f9' },
          }}
        >
          Clear
        </Button>
      )}
    </Box>
  );
}

export default FoodFilters;
