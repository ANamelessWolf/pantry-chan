export const FoodOutputSchema = {
    FoodOutput: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        category: { $ref: '#/components/schemas/FoodCategory' },
        portion: {
          type: 'object',
          properties: {
            value: { type: 'number' },
            unit: { $ref: '#/components/schemas/UnitOutput' },
            conversions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  unit: { $ref: '#/components/schemas/UnitOutput' },
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
                unit: { $ref: '#/components/schemas/UnitOutput' }
              }
            },
            Calories: { type: 'number' },
            Protein_g: { type: 'number' },
            Carbohydrates_g: { type: 'number' }
            // You can add more macro fields as needed
          }
        }
      }
    }
  };
  