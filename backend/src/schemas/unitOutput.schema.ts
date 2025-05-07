export const UnitOutputSchema = {
    UnitOutput: {
      type: 'object',
      required: ['id', 'name', 'symbol', 'category', 'conversionValue'],
      properties: {
        id: { type: 'string', description: 'UUID of the unit' },
        name: { type: 'string' },
        symbol: { type: 'string' },
        category: { type: 'string' },
        conversionValue: { type: 'number' }
      }
    }
  };
  