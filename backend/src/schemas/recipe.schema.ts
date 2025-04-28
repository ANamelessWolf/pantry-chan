export const RecipeSchema = {
    Recipe: {
      type: 'object',
      required: ['items', 'totalMacros'],
      properties: {
        id: {
          type: 'string',
          description: 'Unique identifier (GUID)'
        },
        items: {
          type: 'array',
          description: 'Array of food items with macros',
          items: {
            type: 'object',
            properties: {
              food: { type: 'string' },
              macros: { type: 'object' }
            }
          }
        },
        totalMacros: {
          type: 'object',
          description: 'Total nutritional information for the recipe'
        }
      }
    }
  };
  