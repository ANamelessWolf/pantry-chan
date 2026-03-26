import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Box,
  IconButton,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { closeFilterModal } from '../../store/filterModalSlice';
import { setFoodFilters, clearFilters } from '../../store/filtersSlice';
import t from '../../constants/translations/food.json';

const lang = 'en';

const MACRO_KEYS = [
  { key: 'Calories',         label: 'Calories' },
  { key: 'Protein_g',        label: 'Protein (g)' },
  { key: 'Carbohydrates_g',  label: 'Carbohydrates (g)' },
  { key: 'TotalFat_g',       label: 'Total Fat (g)' },
  { key: 'SaturatedFat_g',   label: 'Saturated Fat (g)' },
  { key: 'Cholesterol_mg',   label: 'Cholesterol (mg)' },
  { key: 'Sodium_mg',        label: 'Sodium (mg)' },
  { key: 'Potassium_mg',     label: 'Potassium (mg)' },
  { key: 'DietaryFiber_g',   label: 'Dietary Fiber (g)' },
  { key: 'Sugars_g',         label: 'Sugars (g)' },
  { key: 'VitaminC_mg',      label: 'Vitamin C (mg)' },
  { key: 'Calcium_mg',       label: 'Calcium (mg)' },
  { key: 'Iron_mg',          label: 'Iron (mg)' },
  { key: 'VitaminD_IU',      label: 'Vitamin D (IU)' },
  { key: 'VitaminB6_mg',     label: 'Vitamin B6 (mg)' },
  { key: 'VitaminB12_microg',label: 'Vitamin B12 (μg)' },
  { key: 'Magnesium_mg',     label: 'Magnesium (mg)' },
];

const COMPARE_OPTIONS = [
  { value: 'MoreThan', label: '≥ More than' },
  { value: 'LessThan', label: '≤ Less than' },
  { value: 'Equal',    label: '= Equal' },
];

const EMPTY_FILTERS = { category: '', name: '', macros: [] };

function FoodFilterModal() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.filterModal.open);
  const foodFilters = useSelector((state) => state.filters.foodFilters);
  const categories = useSelector((state) => state.foodCategories.items);

  const [localCategory, setLocalCategory] = useState('');
  const [localName, setLocalName] = useState('');
  const [localMacros, setLocalMacros] = useState([]);

  // New macro row state
  const [newKey, setNewKey] = useState('');
  const [newCompare, setNewCompare] = useState('MoreThan');
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    if (open) {
      setLocalCategory(foodFilters.category || '');
      setLocalName(foodFilters.name || '');
      setLocalMacros(foodFilters.macros || []);
      setNewKey('');
      setNewCompare('MoreThan');
      setNewValue('');
    }
  }, [open, foodFilters]);

  const addedKeys = new Set(localMacros.map((m) => m.key));
  const availableKeys = MACRO_KEYS.filter((m) => !addedKeys.has(m.key));

  const handleAddMacro = () => {
    if (!newKey || newValue === '') return;
    setLocalMacros((prev) => [
      ...prev,
      { key: newKey, compare: newCompare, value: Number(newValue) },
    ]);
    setNewKey('');
    setNewCompare('MoreThan');
    setNewValue('');
  };

  const handleRemoveMacro = (key) => {
    setLocalMacros((prev) => prev.filter((m) => m.key !== key));
  };

  const handleApply = () => {
    dispatch(setFoodFilters({ category: localCategory, name: localName, macros: localMacros }));
    dispatch(closeFilterModal());
  };

  const handleClear = () => {
    dispatch(clearFilters());
    dispatch(closeFilterModal());
  };

  const getMacroLabel = (key) => MACRO_KEYS.find((m) => m.key === key)?.label ?? key;
  const getCompareLabel = (val) => COMPARE_OPTIONS.find((c) => c.value === val)?.label ?? val;

  return (
    <Dialog open={open} onClose={() => dispatch(closeFilterModal())} maxWidth="sm" fullWidth>
      <DialogTitle>Food Filters</DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2 }}>

        {/* ── Category */}
        <FormControl size="small" fullWidth>
          <InputLabel>{t[lang].filterByCategory}</InputLabel>
          <Select
            value={localCategory}
            label={t[lang].filterByCategory}
            onChange={(e) => setLocalCategory(e.target.value)}
            sx={{ borderRadius: '8px' }}
          >
            <MenuItem value=""><em>{t[lang].allCategories}</em></MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* ── Name */}
        <TextField
          size="small"
          label="Name contains"
          placeholder="e.g. chicken"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        />

        <Divider />

        {/* ── Macro filters */}
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
          Macro Filters
        </Typography>

        {/* Added macro rows */}
        {localMacros.map((m) => (
          <Box
            key={m.key}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1.5,
              py: 0.75,
              borderRadius: '8px',
              backgroundColor: '#f1f5f9',
            }}
          >
            <Typography sx={{ flex: 1, fontSize: 13, fontWeight: 500 }}>
              {getMacroLabel(m.key)}
            </Typography>
            <Typography sx={{ fontSize: 13, color: 'text.secondary', minWidth: 90 }}>
              {getCompareLabel(m.compare)}
            </Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 600, minWidth: 40, textAlign: 'right' }}>
              {m.value}
            </Typography>
            <IconButton size="small" onClick={() => handleRemoveMacro(m.key)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}

        {/* New macro row */}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
          <FormControl size="small" sx={{ flex: 2 }}>
            <InputLabel>Macro</InputLabel>
            <Select
              value={newKey}
              label="Macro"
              onChange={(e) => setNewKey(e.target.value)}
              sx={{ borderRadius: '8px' }}
            >
              {availableKeys.map((m) => (
                <MenuItem key={m.key} value={m.key}>{m.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ flex: 1.5 }}>
            <InputLabel>Compare</InputLabel>
            <Select
              value={newCompare}
              label="Compare"
              onChange={(e) => setNewCompare(e.target.value)}
              sx={{ borderRadius: '8px' }}
            >
              {COMPARE_OPTIONS.map((c) => (
                <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            size="small"
            label="Value"
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            inputProps={{ min: 0 }}
          />

          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            onClick={handleAddMacro}
            disabled={!newKey || newValue === ''}
            sx={{ textTransform: 'none', borderRadius: '8px', height: 40, whiteSpace: 'nowrap' }}
          >
            Add
          </Button>
        </Box>

      </DialogContent>

      <DialogActions>
        <Button onClick={handleClear} sx={{ textTransform: 'none' }}>
          Clear all
        </Button>
        <Button onClick={handleApply} variant="contained" sx={{ textTransform: 'none' }}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FoodFilterModal;
