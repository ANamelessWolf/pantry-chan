import api from './axios';

// ─── Foods ───────────────────────────────────────────────────────────────────
// GET  /food          → HttpResponse { data: FoodOutput[], success, message }
// POST /food          → raw Food document (201)
// PUT  /food/:id      → mapped FoodOutput
// DELETE /food/:id    → 204 No Content
//
// NOTE: The backend PUT/DELETE routes use findByIdAndUpdate/findByIdAndDelete
// which queries by MongoDB _id. The UUID `id` field from FoodOutput may not
// work until the backend is updated to use findOne({ id: req.params.id }).

export const getAllFoods = () => api.get('/food');
export const getFoodById = (id) => api.get(`/food/${id}`);
export const createFood = (data) => api.post('/food', data);
export const updateFood = (id, data) => api.put(`/food/${id}`, data);
export const deleteFood = (id) => api.delete(`/food/${id}`);
export const uploadFoodImage = (id, formData) =>
  api.post(`/food/${id}/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// ─── Categories ──────────────────────────────────────────────────────────────
// GET  /category      → HttpResponse { data: FoodCategory[], success, message }
// POST /category      → HttpResponse { data: FoodCategory, success, message }

export const getAllCategories = () => api.get('/category');
export const createCategory = (data) => api.post('/category', data);

// ─── Units ───────────────────────────────────────────────────────────────────
// GET  /unit          → HttpResponse { data: Unit[], success, message }
// POST /unit          → HttpResponse { data: Unit, success, message }

export const getAllUnits = () => api.get('/unit');
export const createUnit = (data) => api.post('/unit', data);
