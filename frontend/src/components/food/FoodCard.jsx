import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import ScaleIcon from '@mui/icons-material/Scale';
import t from '../../constants/translations/food.json';
import './food.scss';

const lang = 'en';

const MEDIA_HOST = (process.env.REACT_APP_API_URL || 'http://localhost:4001/api').replace(/\/api\/?$/, '');

const MACROS = [
  { key: 'Calories',        labelKey: 'calories', unit: 'kcal', cssClass: 'calories' },
  { key: 'Carbohydrates_g', labelKey: 'carbs',    unit: 'g',    cssClass: 'carbs'    },
  { key: 'Protein_g',       labelKey: 'protein',  unit: 'g',    cssClass: 'protein'  },
  { key: 'TotalFat_g',      labelKey: 'fat',      unit: 'g',    cssClass: 'fat'      },
];

function MacroItem({ value, unit, label, cssClass }) {
  return (
    <Box className={`food-card__macro-item food-card__macro-item--${cssClass}`}>
      <Typography className={`food-card__macro-value food-card__macro-value--${cssClass}`}>
        {value != null ? value : '—'}
        {value != null && (
          <span className="food-card__macro-unit">{unit}</span>
        )}
      </Typography>
      <Typography className="food-card__macro-label">{label}</Typography>
    </Box>
  );
}

function FoodCard({ food, onEdit, onDelete, onShow }) {
  const handleEdit = (e) => { e.stopPropagation(); onEdit(food); };
  const handleDelete = (e) => { e.stopPropagation(); onDelete(food); };
  const handleShow = (e) => { e.stopPropagation(); onShow(food); };

  const portionLabel = food.portion?.value != null
    ? `${food.portion.value} ${food.portion.unit?.symbol || food.portion.unit?.name || ''}`
    : '—';

  const imageUrl = food.imageUrl ? `${MEDIA_HOST}${food.imageUrl}` : null;

  return (
    <Card className="food-card" elevation={0}>
      {/* Image / placeholder */}
      <Box className="food-card__image-wrapper">
        {imageUrl ? (
          <img
            className="food-card__image"
            src={imageUrl}
            alt={food.name}
            loading="lazy"
          />
        ) : (
          <FoodBankIcon className="food-card__image-placeholder" />
        )}

        {/* Action buttons overlay */}
        <Box className="food-card__actions">
          <Tooltip title="Ver info nutricional" placement="top">
            <IconButton
              size="small"
              className="food-card__actions-show"
              onClick={handleShow}
              aria-label="Ver info nutricional"
            >
              <InfoOutlinedIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t[lang].editFood} placement="top">
            <IconButton
              size="small"
              className="food-card__actions-edit"
              onClick={handleEdit}
              aria-label={t[lang].editFood}
            >
              <EditIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t[lang].deleteFood} placement="top">
            <IconButton
              size="small"
              className="food-card__actions-delete"
              onClick={handleDelete}
              aria-label={t[lang].deleteFood}
            >
              <DeleteOutlineIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Main content */}
      <CardContent className="food-card__content">
        <Typography className="food-card__name" title={food.name}>
          {food.name}
        </Typography>

        <Box className="food-card__category-row">
          {food.category?.name && (
            <Chip
              label={food.category.name}
              size="small"
              color="primary"
              variant="outlined"
              sx={{
                fontSize: '0.68rem',
                height: 20,
                borderRadius: '6px',
                '& .MuiChip-label': { px: '7px' },
              }}
            />
          )}
        </Box>

        {/* Macros 2×2 grid */}
        <Box className="food-card__macros">
          {MACROS.map(({ key, labelKey, unit, cssClass }) => (
            <MacroItem
              key={key}
              value={food.macros?.[key]}
              unit={unit}
              label={t[lang][labelKey]}
              cssClass={cssClass}
            />
          ))}
        </Box>
      </CardContent>

      {/* Footer — portion */}
      <Box className="food-card__footer">
        <Typography className="food-card__portion">
          <ScaleIcon sx={{ fontSize: 13, color: '#94a3b8' }} />
          {t[lang].portion}: {portionLabel}
        </Typography>
      </Box>
    </Card>
  );
}

export default FoodCard;
