export const FoodSchema = {
  Food: {
    type: 'object',
    required: ['name', 'portion', 'macros'],
    properties: {
      name: { type: 'string' },
      category: { type: 'string', description: 'FoodCategory ObjectId or id' },
      portion: {
        type: 'object',
        required: ['value', 'unit'],
        properties: {
          value: { type: 'number' },
          unit: { type: 'string', description: 'Unit ObjectId or id' },
          conversions: {
            type: 'array',
            items: {
              type: 'object',
              required: ['unit', 'conversionValue'],
              properties: {
                unit: { type: 'string' },
                conversionValue: { type: 'number' }
              }
            }
          }
        }
      },
      macros: {
        type: 'object',
        properties: {
          Portion: {
            type: 'object',
            properties: {
              value: { type: 'number' },
              unit: { type: 'string' }
            }
          }
          // Add macro fields here if needed
        }
      }
    }
  }
};
