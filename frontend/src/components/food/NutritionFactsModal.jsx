import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './food.scss';

// Format number with Spanish comma decimal separator; returns null if value is 0 or missing
const fmt = (val, decimals = 2) => {
  if (val == null) return null;
  const n = parseFloat(val);
  if (isNaN(n) || n === 0) return null;
  return n % 1 === 0 ? String(n) : n.toFixed(decimals).replace('.', ',');
};

// Render a row only when the value is non-zero
function NutritionRow({ label, value, unit, bold, indent, thick }) {
  const display = fmt(value);
  if (display === null) return null;
  return (
    <>
      {thick && <div className="nf__bar nf__bar--medium" />}
      <div
        className={[
          'nf__row',
          bold ? 'nf__row--bold' : '',
          indent ? 'nf__row--indent' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <span className="nf__row-label">{label}</span>
        <span className="nf__row-value">{display}{unit}</span>
      </div>
    </>
  );
}

// Vitamin/mineral chip — only renders if non-zero
function MicroItem({ label, value, unit }) {
  const display = fmt(value);
  if (display === null) return null;
  return (
    <div className="nf__micro-item">
      <span className="nf__micro-label">{label}</span>
      <span className="nf__micro-value">{display}{unit}</span>
    </div>
  );
}

function NutritionFactsModal({ open, onClose, food }) {
  if (!food) return null;

  const macros = food.macros || {};
  const portion = food.portion;
  const portionStr =
    portion?.value != null
      ? `${portion.value} ${portion.unit?.symbol || portion.unit?.name || ''}`
      : '—';

  const kcal = macros.Calories || 0;
  const kj = Math.round(kcal * 4.184);

  // Check if vitamins/minerals section has any non-zero values
  const vitaminsData = [
    { label: 'Vitamina C', value: macros.VitaminC_mg, unit: 'mg' },
    { label: 'Calcio', value: macros.Calcium_mg, unit: 'mg' },
    { label: 'Hierro', value: macros.Iron_mg, unit: 'mg' },
    { label: 'Vitamina D', value: macros.VitaminD_IU, unit: 'UI' },
    { label: 'Vitamina B6', value: macros.VitaminB6_mg, unit: 'mg' },
    { label: 'Vitamina B12', value: macros.VitaminB12_microg, unit: 'μg' },
    { label: 'Magnesio', value: macros.Magnesium_mg, unit: 'mg' },
    { label: 'Potasio', value: macros.Potassium_mg, unit: 'mg' },
  ];
  const hasVitamins = vitaminsData.some((v) => fmt(v.value) !== null);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          maxWidth: 520,
          overflowX: 'hidden',
        },
      }}
    >
      {/* ── Header */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 1.5,
          px: 2.5,
          borderBottom: '1px solid #e2e8f0',
          fontWeight: 700,
          fontSize: '1rem',
        }}
      >
        {food.name}
        <IconButton size="small" onClick={onClose} aria-label="Cerrar">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      {/* ── Body */}
      <DialogContent sx={{ p: 0, overflowX: 'hidden' }}>
        <div className="nf">

          {/* ── Title bar */}
          <div className="nf__title">Info. Nutricional</div>

          {/* ── Serving size */}
          <div className="nf__serving">
            <span>Tamaño de la Porción</span>
            <span className="nf__serving-value">{portionStr}</span>
          </div>

          <div className="nf__bar nf__bar--gray" />
          <div className="nf__per-serving">Por porción</div>
          <div className="nf__bar nf__bar--thick" />

          {/* ── Energía (always shown) */}
          <div className="nf__energy">
            <span className="nf__energy-label">Energía</span>
            <span className="nf__energy-values">
              <span className="nf__energy-kj">{kj} kj</span>
              <span className="nf__energy-kcal">{Math.round(kcal)} kcal</span>
            </span>
          </div>

          {/* ── Macros */}
          <NutritionRow thick bold label="Proteína" value={macros.Protein_g} unit="g" />
          <NutritionRow thick bold label="Carbohidratos" value={macros.Carbohydrates_g} unit="g" />
          <NutritionRow indent label="Fibra Dietética" value={macros.DietaryFiber_g} unit="g" />
          <NutritionRow indent label="Azúcares" value={macros.Sugars_g} unit="g" />
          <NutritionRow thick bold label="Grasa Total" value={macros.TotalFat_g} unit="g" />
          <NutritionRow indent label="Grasa Saturada" value={macros.SaturatedFat_g} unit="g" />
          <NutritionRow thick label="Colesterol" value={macros.Cholesterol_mg} unit="mg" />
          <NutritionRow thick label="Sodio" value={macros.Sodium_mg} unit="mg" />

          {/* ── Vitamins & Minerals */}
          {hasVitamins && (
            <>
              <div className="nf__bar nf__bar--thick" />
              <div className="nf__section-label">Vitaminas y Minerales</div>
              <div className="nf__micro-grid">
                {vitaminsData.map((v) => (
                  <MicroItem key={v.label} label={v.label} value={v.value} unit={v.unit} />
                ))}
              </div>
            </>
          )}

          <div className="nf__bar nf__bar--thick" />
          <div className="nf__footer">
            * Los valores son por porción indicada
          </div>
        </div>
      </DialogContent>

      <DialogActions sx={{ px: 2.5, py: 1.5, borderTop: '1px solid #f1f5f9' }}>
        <Button
          onClick={onClose}
          sx={{ textTransform: 'none', borderRadius: '8px', color: '#64748b' }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NutritionFactsModal;
