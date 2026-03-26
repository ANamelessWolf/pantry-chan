import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Divider,
  Collapse,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CategoryIcon from '@mui/icons-material/Category';
import ScaleIcon from '@mui/icons-material/Scale';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { fetchFoodCategories, createFoodCategory } from '../../store/foodCategoriesSlice';
import { fetchUnits, createUnit } from '../../store/unitsSlice';
import t from '../../constants/translations/food.json';
import './food.scss';

const MEDIA_HOST = (process.env.REACT_APP_API_URL || 'http://localhost:4001/api').replace(/\/api\/?$/, '');
const lang = 'en';

// ─── Form helpers ─────────────────────────────────────────────────────────────

const EMPTY_FORM = {
  name: '',
  category: '',
  barcode: '',
  portion: { value: '', unit: '' },
  macros: {
    Calories: '',
    TotalFat_g: '',
    SaturatedFat_g: '',
    Cholesterol_mg: '',
    Sodium_mg: '',
    Potassium_mg: '',
    Carbohydrates_g: '',
    DietaryFiber_g: '',
    Sugars_g: '',
    Protein_g: '',
    VitaminC_mg: '',
    Calcium_mg: '',
    Iron_mg: '',
    VitaminD_IU: '',
    VitaminB6_mg: '',
    VitaminB12_microg: '',
    Magnesium_mg: '',
  },
};

const foodToForm = (food) => ({
  name: food.name || '',
  category: food.category?.id || '',
  barcode: food.barcode || '',
  portion: {
    value: food.portion?.value ?? '',
    unit: food.portion?.unit?.id || '',
  },
  macros: {
    Calories:          food.macros?.Calories          ?? '',
    TotalFat_g:        food.macros?.TotalFat_g        ?? '',
    SaturatedFat_g:    food.macros?.SaturatedFat_g    ?? '',
    Cholesterol_mg:    food.macros?.Cholesterol_mg    ?? '',
    Sodium_mg:         food.macros?.Sodium_mg         ?? '',
    Potassium_mg:      food.macros?.Potassium_mg      ?? '',
    Carbohydrates_g:   food.macros?.Carbohydrates_g   ?? '',
    DietaryFiber_g:    food.macros?.DietaryFiber_g    ?? '',
    Sugars_g:          food.macros?.Sugars_g          ?? '',
    Protein_g:         food.macros?.Protein_g         ?? '',
    VitaminC_mg:       food.macros?.VitaminC_mg       ?? '',
    Calcium_mg:        food.macros?.Calcium_mg        ?? '',
    Iron_mg:           food.macros?.Iron_mg           ?? '',
    VitaminD_IU:       food.macros?.VitaminD_IU       ?? '',
    VitaminB6_mg:      food.macros?.VitaminB6_mg      ?? '',
    VitaminB12_microg: food.macros?.VitaminB12_microg ?? '',
    Magnesium_mg:      food.macros?.Magnesium_mg      ?? '',
  },
});

const formToPayload = (form) => {
  const macros = {};
  for (const [k, v] of Object.entries(form.macros)) {
    if (v !== '') macros[k] = parseFloat(v);
  }
  const payload = {
    name: form.name.trim(),
    category: form.category,
    portion: {
      value: parseFloat(form.portion.value),
      unit: form.portion.unit,
    },
    macros,
  };
  if (form.barcode.trim()) payload.barcode = form.barcode.trim();
  return payload;
};

// ─── Inline "Add Category" ────────────────────────────────────────────────────

function InlineNewCategory({ onSave, onCancel, saving, saveError }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [localError, setLocalError] = useState('');

  const error = localError || saveError;

  const handleSave = () => {
    if (!name.trim()) { setLocalError('Name is required'); return; }
    setLocalError('');
    onSave(name.trim(), description.trim());
  };

  return (
    <Box className="food-form-modal__inline-add">
      <Typography className="food-form-modal__inline-add-title">New Category</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <TextField
          size="small"
          label={t[lang].newCategoryName}
          value={name}
          onChange={(e) => { setName(e.target.value); setLocalError(''); }}
          error={!!error}
          helperText={error}
          fullWidth
          autoFocus
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />
        <TextField
          size="small"
          label={t[lang].newCategoryDescription}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />
      </Box>
      <Box className="food-form-modal__inline-add-actions">
        <Button size="small" onClick={onCancel} disabled={saving} sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={handleSave}
          disabled={saving}
          sx={{ textTransform: 'none', borderRadius: '6px', minWidth: 64 }}
        >
          {saving ? <CircularProgress size={14} color="inherit" /> : 'Add'}
        </Button>
      </Box>
    </Box>
  );
}

// ─── Inline "Add Unit" ────────────────────────────────────────────────────────

function InlineNewUnit({ onSave, onCancel, saving, saveError }) {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [localError, setLocalError] = useState('');

  const error = localError || saveError;

  const handleSave = () => {
    if (!name.trim()) { setLocalError('Name is required'); return; }
    setLocalError('');
    onSave(name.trim(), symbol.trim());
  };

  return (
    <Box className="food-form-modal__inline-add">
      <Typography className="food-form-modal__inline-add-title">New Unit</Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          size="small"
          label={t[lang].newUnitName}
          value={name}
          onChange={(e) => { setName(e.target.value); setLocalError(''); }}
          error={!!error}
          helperText={error}
          sx={{ flex: 2, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          autoFocus
        />
        <TextField
          size="small"
          label={t[lang].newUnitSymbol}
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />
      </Box>
      <Box className="food-form-modal__inline-add-actions">
        <Button size="small" onClick={onCancel} disabled={saving} sx={{ textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={handleSave}
          disabled={saving}
          sx={{ textTransform: 'none', borderRadius: '6px', minWidth: 64 }}
        >
          {saving ? <CircularProgress size={14} color="inherit" /> : 'Add'}
        </Button>
      </Box>
    </Box>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ Icon, label }) {
  return (
    <Typography className="food-form-modal__section-title">
      {Icon && <Icon sx={{ fontSize: 13 }} />}
      {label}
    </Typography>
  );
}

// ─── Main modal ───────────────────────────────────────────────────────────────

function FoodFormModal({ open, onClose, onSubmit, food, loading: submitting }) {
  const dispatch = useDispatch();
  const isEditing = !!food;
  const fileInputRef = useRef(null);

  // ── Redux state
  const { items: categories, loading: catsLoading } = useSelector(
    (state) => state.foodCategories
  );
  const { items: units, loading: unitsLoading } = useSelector(
    (state) => state.units
  );
  const optionsLoading = catsLoading || unitsLoading;

  // ── Local form state
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // ── Image state
  const [imageFile, setImageFile] = useState(null);       // File selected by user
  const [imagePreview, setImagePreview] = useState(null); // object URL for preview
  const [existingImageUrl, setExistingImageUrl] = useState(null); // from food.imageUrl

  // ── Inline-add visibility & async state
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [categoryCreating, setCategoryCreating] = useState(false);
  const [categoryCreateError, setCategoryCreateError] = useState('');

  const [showNewUnit, setShowNewUnit] = useState(false);
  const [unitCreating, setUnitCreating] = useState(false);
  const [unitCreateError, setUnitCreateError] = useState('');

  // ── Load catalog data on open
  useEffect(() => {
    if (!open) return;
    setForm(food ? foodToForm(food) : EMPTY_FORM);
    setErrors({});
    setShowNewCategory(false);
    setShowNewUnit(false);
    setCategoryCreateError('');
    setUnitCreateError('');
    // Reset image state
    setImageFile(null);
    setImagePreview(null);
    setExistingImageUrl(food?.imageUrl ? `${MEDIA_HOST}${food.imageUrl}` : null);
    dispatch(fetchFoodCategories());
    dispatch(fetchUnits());
  }, [open, food, dispatch]);

  // ── Field helpers

  const setField = (path, value) => {
    setErrors((prev) => ({ ...prev, [path]: '' }));
    setForm((prev) => {
      if (!path.includes('.')) return { ...prev, [path]: value };
      const [parent, child] = path.split('.');
      return { ...prev, [parent]: { ...prev[parent], [child]: value } };
    });
  };

  const setMacro = (key, value) =>
    setForm((prev) => ({ ...prev, macros: { ...prev.macros, [key]: value } }));

  // ── Validation

  const validate = () => {
    const errs = {};
    if (!form.name.trim())   errs.name = 'Name is required';
    if (!form.category)      errs.category = 'Category is required';
    if (!form.portion.value) errs['portion.value'] = 'Portion value is required';
    if (!form.portion.unit)  errs['portion.unit'] = 'Unit is required';
    if (form.macros.Calories === '') errs.Calories = 'Required';
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit(formToPayload(form), imageFile);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setExistingImageUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const currentPreview = imagePreview || existingImageUrl;

  // ── Inline create handlers (dispatch thunks, select result)

  const handleSaveCategory = async (name, description) => {
    setCategoryCreating(true);
    setCategoryCreateError('');
    try {
      const result = await dispatch(
        createFoodCategory({ name, description })
      ).unwrap();
      setField('category', result.id);
      setShowNewCategory(false);
    } catch (err) {
      setCategoryCreateError(typeof err === 'string' ? err : 'Failed to create category');
    } finally {
      setCategoryCreating(false);
    }
  };

  const handleSaveUnit = async (name, symbol) => {
    setUnitCreating(true);
    setUnitCreateError('');
    try {
      const result = await dispatch(
        createUnit({ name, symbol, category: 'custom', conversionValue: 1 })
      ).unwrap();
      setField('portion.unit', result.id);
      setShowNewUnit(false);
    } catch (err) {
      setUnitCreateError(typeof err === 'string' ? err : 'Failed to create unit');
    } finally {
      setUnitCreating(false);
    }
  };

  // ── Macro field builder

  const macroField = (key, label) => (
    <TextField
      key={key}
      size="small"
      label={label}
      type="number"
      value={form.macros[key]}
      onChange={(e) => setMacro(key, e.target.value)}
      inputProps={{ min: 0, step: 0.1 }}
      error={!!errors[key]}
      helperText={errors[key]}
      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
    />
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: '16px', maxHeight: '92vh' } }}
    >
      {/* ── Title */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2,
          px: 3,
          borderBottom: '1px solid #f1f5f9',
          fontWeight: 800,
          fontSize: '1.05rem',
        }}
      >
        {isEditing ? t[lang].editFood : t[lang].addFood}
        <IconButton size="small" onClick={onClose} aria-label="Close modal">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* ── Body */}
      <DialogContent
        sx={{
          pt: 3,
          px: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          overflowY: 'auto',
        }}
      >
        {/* Section 0 — Image picker */}
        <Box className="food-form-modal__section">
          <SectionLabel Icon={AddPhotoAlternateIcon} label="Imagen" />
          <Box className="food-image-picker">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            {/* Preview / placeholder */}
            <Box
              className="food-image-picker__preview"
              onClick={() => fileInputRef.current?.click()}
              role="button"
              aria-label="Seleccionar imagen"
            >
              {currentPreview ? (
                <img src={currentPreview} alt="preview" />
              ) : (
                <Box className="food-image-picker__placeholder">
                  <AddPhotoAlternateIcon />
                  <span>Haz clic para seleccionar imagen</span>
                </Box>
              )}
            </Box>
            {/* Actions */}
            <Box className="food-image-picker__actions">
              <Button
                size="small"
                variant="outlined"
                startIcon={<AddPhotoAlternateIcon sx={{ fontSize: '14px !important' }} />}
                onClick={() => fileInputRef.current?.click()}
                sx={{ textTransform: 'none', borderRadius: '8px', fontSize: '0.78rem' }}
              >
                {currentPreview ? 'Cambiar imagen' : 'Seleccionar imagen'}
              </Button>
              {currentPreview && (
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon sx={{ fontSize: '14px !important' }} />}
                  onClick={handleRemoveImage}
                  sx={{ textTransform: 'none', borderRadius: '8px', fontSize: '0.78rem' }}
                >
                  Quitar
                </Button>
              )}
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* Section 1 — Basic info */}
        <Box className="food-form-modal__section">
          <SectionLabel Icon={CategoryIcon} label={t[lang].basicInfo} />

          <TextField
            size="small"
            label={t[lang].name}
            value={form.name}
            onChange={(e) => setField('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            autoFocus
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />

          {/* Category select */}
          <Box>
            <FormControl fullWidth size="small" error={!!errors.category}>
              <InputLabel>{t[lang].category}</InputLabel>
              <Select
                value={form.category}
                label={t[lang].category}
                onChange={(e) => setField('category', e.target.value)}
                disabled={optionsLoading}
                sx={{ borderRadius: '8px' }}
                endAdornment={
                  catsLoading ? (
                    <CircularProgress size={16} sx={{ mr: 2 }} />
                  ) : null
                }
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                  {errors.category}
                </Typography>
              )}
            </FormControl>

            {!showNewCategory && (
              <Button
                size="small"
                startIcon={<AddIcon sx={{ fontSize: '14px !important' }} />}
                onClick={() => setShowNewCategory(true)}
                sx={{
                  mt: 0.5,
                  textTransform: 'none',
                  fontSize: '0.73rem',
                  color: '#1976d2',
                  p: '2px 6px',
                  borderRadius: '6px',
                }}
              >
                {t[lang].addNewCategory}
              </Button>
            )}
            <Collapse in={showNewCategory} unmountOnExit>
              <InlineNewCategory
                onSave={handleSaveCategory}
                onCancel={() => { setShowNewCategory(false); setCategoryCreateError(''); }}
                saving={categoryCreating}
                saveError={categoryCreateError}
              />
            </Collapse>
          </Box>

          <TextField
            size="small"
            label={t[lang].barcode}
            value={form.barcode}
            onChange={(e) => setField('barcode', e.target.value)}
            fullWidth
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </Box>

        <Divider />

        {/* Section 2 — Portion */}
        <Box className="food-form-modal__section">
          <SectionLabel Icon={ScaleIcon} label={t[lang].portion} />

          <Box className="food-form-modal__fields-grid">
            <TextField
              size="small"
              label={t[lang].portionValue}
              type="number"
              value={form.portion.value}
              onChange={(e) => setField('portion.value', e.target.value)}
              error={!!errors['portion.value']}
              helperText={errors['portion.value']}
              inputProps={{ min: 0.01, step: 0.1 }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            />

            {/* Unit select */}
            <Box>
              <FormControl fullWidth size="small" error={!!errors['portion.unit']}>
                <InputLabel>{t[lang].unit}</InputLabel>
                <Select
                  value={form.portion.unit}
                  label={t[lang].unit}
                  onChange={(e) => setField('portion.unit', e.target.value)}
                  disabled={optionsLoading}
                  sx={{ borderRadius: '8px' }}
                  endAdornment={
                    unitsLoading ? (
                      <CircularProgress size={16} sx={{ mr: 2 }} />
                    ) : null
                  }
                >
                  {units.map((u) => (
                    <MenuItem key={u.id} value={u.id}>
                      {u.name}{u.symbol ? ` (${u.symbol})` : ''}
                    </MenuItem>
                  ))}
                </Select>
                {errors['portion.unit'] && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                    {errors['portion.unit']}
                  </Typography>
                )}
              </FormControl>

              {!showNewUnit && (
                <Button
                  size="small"
                  startIcon={<AddIcon sx={{ fontSize: '14px !important' }} />}
                  onClick={() => setShowNewUnit(true)}
                  sx={{
                    mt: 0.5,
                    textTransform: 'none',
                    fontSize: '0.73rem',
                    color: '#1976d2',
                    p: '2px 6px',
                    borderRadius: '6px',
                  }}
                >
                  {t[lang].addNewUnit}
                </Button>
              )}
              <Collapse in={showNewUnit} unmountOnExit>
                <InlineNewUnit
                  onSave={handleSaveUnit}
                  onCancel={() => { setShowNewUnit(false); setUnitCreateError(''); }}
                  saving={unitCreating}
                  saveError={unitCreateError}
                />
              </Collapse>
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* Section 3 — Main macros */}
        <Box className="food-form-modal__section">
          <SectionLabel Icon={LocalFireDepartmentIcon} label={t[lang].nutritionFacts} />
          <Box className="food-form-modal__fields-grid">
            {macroField('Calories',        `${t[lang].calories} (kcal)`)}
            {macroField('Protein_g',       `${t[lang].protein} (g)`)}
            {macroField('Carbohydrates_g', `${t[lang].carbs} (g)`)}
            {macroField('TotalFat_g',      `${t[lang].fat} (g)`)}
          </Box>
        </Box>

        {/* Section 4 — Additional nutrients (accordion) */}
        <Accordion
          elevation={0}
          sx={{
            border: '1px solid #e9eef5',
            borderRadius: '10px !important',
            '&:before': { display: 'none' },
            '&.Mui-expanded': { mt: 0 },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              minHeight: 44,
              borderRadius: '10px',
              '& .MuiAccordionSummary-content': { my: 0 },
            }}
          >
            <Typography
              sx={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.7px',
              }}
            >
              {t[lang].additionalNutrients}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0.5, pb: 2 }}>
            <Box className="food-form-modal__fields-grid">
              {macroField('SaturatedFat_g',    t[lang].saturatedFat)}
              {macroField('Cholesterol_mg',     t[lang].cholesterol)}
              {macroField('Sodium_mg',          t[lang].sodium)}
              {macroField('Potassium_mg',       t[lang].potassium)}
              {macroField('DietaryFiber_g',     t[lang].dietaryFiber)}
              {macroField('Sugars_g',           t[lang].sugars)}
              {macroField('VitaminC_mg',        t[lang].vitaminC)}
              {macroField('Calcium_mg',         t[lang].calcium)}
              {macroField('Iron_mg',            t[lang].iron)}
              {macroField('VitaminD_IU',        t[lang].vitaminD)}
              {macroField('VitaminB6_mg',       t[lang].vitaminB6)}
              {macroField('VitaminB12_microg',  t[lang].vitaminB12)}
              {macroField('Magnesium_mg',       t[lang].magnesium)}
            </Box>
          </AccordionDetails>
        </Accordion>
      </DialogContent>

      {/* ── Actions */}
      <DialogActions
        sx={{ px: 3, py: 2, borderTop: '1px solid #f1f5f9', gap: 1 }}
      >
        <Button
          onClick={onClose}
          disabled={submitting}
          sx={{ textTransform: 'none', borderRadius: '8px', color: '#64748b' }}
        >
          {t[lang].cancel}
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitting}
          sx={{
            textTransform: 'none',
            borderRadius: '8px',
            px: 3,
            fontWeight: 600,
            minWidth: 100,
          }}
        >
          {submitting ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={15} color="inherit" />
              {t[lang].saving}
            </Box>
          ) : (
            t[lang].save
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FoodFormModal;
