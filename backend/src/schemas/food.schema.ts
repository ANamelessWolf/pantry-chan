export const FoodSchema = {
    Food: {
      type: 'object',
      required: ['name', 'portion', 'macros'],
      properties: {
        name: { type: 'string' },
        portion: {
          type: 'object',
          properties: {
            value: { type: 'number' },
            unit: { type: 'object' }
          }
        },
        macros: { type: 'object' }
      }
    }
  };
  