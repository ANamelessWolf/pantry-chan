import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { fetchFoods, addFood, editFood, removeFood } from '../store/foodSlice';
import { fetchFoodCategories } from '../store/foodCategoriesSlice';
import { fetchUnits } from '../store/unitsSlice';
import { uploadFoodImage } from '../api/foodApi';
import FoodCatalog from '../components/food/FoodCatalog';
import FoodFilters from '../components/food/FoodFilters';
import FoodFormModal from '../components/food/FoodFormModal';
import DeleteFoodConfirmModal from '../components/food/DeleteFoodConfirmModal';
import NutritionFactsModal from '../components/food/NutritionFactsModal';
import t from '../constants/translations/food.json';
import '../components/food/food.scss';

const lang = 'en';

function Food() {
  const dispatch = useDispatch();
  const { items: foods, loading, error } = useSelector((state) => state.food);

  // ── Filter state
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // ── Modal state
  const [formOpen, setFormOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [foodToDelete, setFoodToDelete] = useState(null);
  const [showFood, setShowFood] = useState(null); // for NutritionFactsModal

  // ── Async operation flags
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // ── Snackbar
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // ── Load catalog data on mount
  useEffect(() => {
    dispatch(fetchFoods());
    dispatch(fetchFoodCategories());
    dispatch(fetchUnits());
  }, [dispatch]);

  // ── Derive unique categories from loaded items (used by FoodFilters)
  const categories = useMemo(() => {
    const seen = new Map();
    foods.forEach((f) => {
      if (f.category?.id && !seen.has(f.category.id)) {
        seen.set(f.category.id, f.category);
      }
    });
    return Array.from(seen.values());
  }, [foods]);

  // ── Client-side filtering
  const filteredFoods = useMemo(() => {
    const q = search.toLowerCase();
    return foods.filter((food) => {
      const matchesSearch =
        !search ||
        food.name?.toLowerCase().includes(q) ||
        food.category?.name?.toLowerCase().includes(q) ||
        food.barcode?.toLowerCase().includes(q);
      const matchesCategory =
        !categoryFilter || food.category?.id === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [foods, search, categoryFilter]);

  // ── Handlers

  const openCreate = () => {
    setSelectedFood(null);
    setFormOpen(true);
  };

  const openEdit = (food) => {
    setSelectedFood(food);
    setFormOpen(true);
  };

  const openDelete = (food) => {
    setFoodToDelete(food);
    setDeleteOpen(true);
  };

  const closeDelete = () => {
    if (deleting) return;
    setDeleteOpen(false);
    setFoodToDelete(null);
  };

  const openShow = (food) => setShowFood(food);
  const closeShow = () => setShowFood(null);

  const handleFormSubmit = async (payload, imageFile) => {
    setSubmitting(true);
    try {
      let result;
      if (selectedFood) {
        result = await dispatch(editFood({ id: selectedFood.id, data: payload })).unwrap();
        notify('Food updated successfully');
      } else {
        result = await dispatch(addFood(payload)).unwrap();
        notify('Food added successfully');
      }

      // Upload image if a new one was selected
      if (imageFile) {
        const foodId = result?.id || selectedFood?.id;
        if (foodId) {
          const formData = new FormData();
          formData.append('image', imageFile);
          await uploadFoodImage(foodId, formData);
        }
      }

      setFormOpen(false);
      dispatch(fetchFoods());
    } catch (err) {
      notify(typeof err === 'string' ? err : 'An error occurred', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!foodToDelete) return;
    setDeleting(true);
    try {
      await dispatch(removeFood(foodToDelete.id)).unwrap();
      notify('Food deleted');
      setDeleteOpen(false);
      setFoodToDelete(null);
    } catch (err) {
      notify(typeof err === 'string' ? err : 'Failed to delete food', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const notify = (message, severity = 'success') =>
    setSnackbar({ open: true, message, severity });

  const closeSnackbar = () =>
    setSnackbar((s) => ({ ...s, open: false }));

  // ── Render

  return (
    <Box>
      {/* ── Header */}
      <Box className="food-catalog__header">
        <Typography className="food-catalog__title" component="h1">
          {t[lang].title}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreate}
          sx={{
            textTransform: 'none',
            borderRadius: '10px',
            px: 2.5,
            fontWeight: 600,
            boxShadow: '0 2px 10px rgba(25,118,210,0.28)',
            '&:hover': { boxShadow: '0 4px 16px rgba(25,118,210,0.36)' },
          }}
        >
          {t[lang].addFood}
        </Button>
      </Box>

      {/* ── Filters */}
      <FoodFilters
        search={search}
        onSearchChange={setSearch}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        categories={categories}
        onClear={() => { setSearch(''); setCategoryFilter(''); }}
      />

      {/* ── Results count */}
      {!loading && !error && foods.length > 0 && (
        <Typography className="food-catalog__count">
          {filteredFoods.length}{' '}
          {filteredFoods.length === 1 ? t[lang].results : t[lang].results_plural}
          {(search || categoryFilter) ? ` of ${foods.length} total` : ''}
        </Typography>
      )}

      {/* ── Catalog grid */}
      <FoodCatalog
        foods={filteredFoods}
        loading={loading}
        error={error}
        onEdit={openEdit}
        onDelete={openDelete}
        onShow={openShow}
        onRetry={() => dispatch(fetchFoods())}
      />

      {/* ── Create / Edit modal */}
      <FoodFormModal
        open={formOpen}
        onClose={() => !submitting && setFormOpen(false)}
        onSubmit={handleFormSubmit}
        food={selectedFood}
        loading={submitting}
      />

      {/* ── Delete confirmation modal */}
      <DeleteFoodConfirmModal
        open={deleteOpen}
        onClose={closeDelete}
        onConfirm={handleConfirmDelete}
        food={foodToDelete}
        loading={deleting}
      />

      {/* ── Nutrition facts modal */}
      <NutritionFactsModal
        open={!!showFood}
        onClose={closeShow}
        food={showFood}
      />

      {/* ── Feedback snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3500}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={closeSnackbar}
          sx={{ borderRadius: '10px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Food;
