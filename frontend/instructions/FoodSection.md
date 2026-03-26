Quiero que trabajes sobre el frontend del proyecto siguiendo este contexto técnico:

Frontend stack:
- React 18+ con JavaScript
- Redux Toolkit
- Axios
- React Router v6
- MUI (Material UI)
- SCSS
- No usar Bootstrap

Usa la skill de UI/UX Pro Max instalada en el proyecto para generar una interfaz cuidada, moderna, clara y usable.

Objetivo:
Implementar la sección de alimentos en el frontend, tomando como base el archivo Food.jsx. Esta vista debe permitir mostrar todo el catálogo de alimentos y administrar los registros con una experiencia visual tipo galería/listado enriquecido. Si creas nuevos componentes, asegúrate de que sean reutilizables y estén bien organizados. La interfaz debe ser profesional, consistente con MUI y tener una buena jerarquía visual para destacar la información clave de cada alimento. Los nuevos componentes los deberas agregar en components

Concepto de alimento:
Un alimento es cualquier producto al que se le pueda asignar:
- datos nutrimentales
- código de barras
- unidad
- categoría
- imagen opcional

Ejemplos:
- Una manzana puede manejar unidad por pieza o por gramos
- Una bebida puede manejar unidad basada en el empaque, como ml o litros

Requerimientos funcionales:
1. En la vista Food.jsx crea una interfaz para mostrar todo el catálogo de alimentos.
2. La lista debe poder filtrarse usando la barra superior.
3. El layout de visualización debe ser tipo galería o cards, ya que los alimentos pueden tener imágenes.
4. Cada card de alimento debe resaltar visualmente:
   - Calories
   - Portion
   - Carbs
   - Fat
   - Protein
5. Agregar y editar alimento debe hacerse con modales.
6. Eliminar alimento debe usar un icono visible, pero antes de borrar debe abrir un modal de confirmación.
7. Si al agregar o editar un alimento la unidad o la categoría no existen, debe haber manera de agregarlas desde el mismo flujo de captura, sin obligar al usuario a salir de la pantalla.
8. Por ahora toda la UI debe estar en inglés.
9. Sin embargo, los textos de headers/labels principales deben guardarse en un JSON con claves en inglés y español, para poder cambiar idioma después.
10. La implementación debe verse profesional, limpia, moderna y consistente con MUI.

Requerimientos de UX/UI:
- Usa MUI como base de componentes
- Usa SCSS para estilos complementarios
- Diseño responsive
- Cards visualmente limpias, con buena jerarquía visual
- Inputs claros y ordenados
- Barra superior útil para búsqueda/filtro
- El modal de alta/edición debe estar bien seccionado
- El modal de confirmación de borrado debe dejar muy claro qué elemento se eliminará
- Usa iconografía apropiada para editar, borrar, imagen, categoría, código de barras y macros
- Evita saturar la interfaz
- Mantén una experiencia usable tanto en desktop como en tablet

Datos que debe manejar el alimento en la UI:
- id
- name
- barcode
- category
- unit
- portion
- image
- calories
- totalFat_g
- carbohydrates_g
- protein_g
- y el resto de campos nutrimentales si ya existen en backend

Sugerencia de estructura a crear o actualizar:
- src/views/Food.jsx
- src/components/food/FoodCatalog.jsx
- src/components/food/FoodCard.jsx
- src/components/food/FoodFormModal.jsx
- src/components/food/DeleteFoodConfirmModal.jsx
- src/components/food/FoodFilters.jsx
- src/store/foodSlice.js
- src/api/foodApi.js
- src/constants/translations/food.json
- src/components/food/*.scss o un archivo scss organizado según convenga

Comportamiento esperado:
- Al entrar a Food.jsx se consulta el catálogo desde el backend
- Se muestra loading, empty state y error state de forma clara
- El usuario puede buscar por nombre, código de barras o categoría
- El usuario puede abrir modal para crear
- El usuario puede abrir modal para editar desde cada card
- El usuario puede eliminar desde cada card con confirmación previa
- Si no existe unidad o categoría, debe poder crearla desde el modal o mediante una subacción integrada
- Los cambios deben refrescar el catálogo sin recargar toda la app

Internacionalización inicial:
Crea un JSON para textos base, por ejemplo con esta idea:
{
  "en": {
    "title": "Food Catalog",
    "searchPlaceholder": "Search food by name, barcode or category",
    "addFood": "Add Food",
    "editFood": "Edit Food",
    "deleteFood": "Delete Food",
    "confirmDeleteTitle": "Delete food",
    "confirmDeleteMessage": "Are you sure you want to delete this food?",
    "calories": "Calories",
    "portion": "Portion",
    "carbs": "Carbs",
    "fat": "Fat",
    "protein": "Protein",
    "barcode": "Barcode",
    "category": "Category",
    "unit": "Unit"
  },
  "es": {
    "title": "Catálogo de alimentos",
    "searchPlaceholder": "Buscar alimento por nombre, código de barras o categoría",
    "addFood": "Agregar alimento",
    "editFood": "Editar alimento",
    "deleteFood": "Eliminar alimento",
    "confirmDeleteTitle": "Eliminar alimento",
    "confirmDeleteMessage": "¿Deseas eliminar este alimento?",
    "calories": "Calorías",
    "portion": "Porción",
    "carbs": "Carbohidratos",
    "fat": "Grasa",
    "protein": "Proteína",
    "barcode": "Código de barras",
    "category": "Categoría",
    "unit": "Unidad"
  }
}

Implementación técnica:
- Usa Redux Toolkit para el estado del catálogo si ayuda a la arquitectura
- Usa Axios para las llamadas API
- No uses TypeScript
- Mantén componentes reutilizables
- Separa lógica, presentación y acceso a datos
- Mantén convenciones limpias de nombres
- No rompas el layout global existente de la app

Entrega esperada:
1. Genera o actualiza los archivos necesarios
2. Implementa la vista completa de Food.jsx
3. Implementa modales de crear, editar y confirmar borrado
4. Implementa la capa de consumo de API
5. Implementa el JSON de headers/textos en inglés y español
6. Agrega estilos SCSS necesarios
7. Deja el código listo para correr
8. Explica brevemente qué archivos creaste o modificaste y por qué

Importante:
- No hagas una solución mínima o genérica
- Quiero una interfaz bien pensada, con buena jerarquía visual
- Prioriza claridad, mantenibilidad y experiencia de usuario
- Usa datos mock o fallback temporal solo si todavía no existe todo el backend necesario, pero deja claro dónde conectar con el endpoint real