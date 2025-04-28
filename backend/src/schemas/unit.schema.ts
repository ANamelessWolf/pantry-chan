export const UnitSchema = {
    Unit: {
      type: 'object',
      required: ['name', 'symbol', 'category', 'conversionValue'],
      properties: {
        id: {
          type: 'string',
          description: 'Unique identifier (GUID)'
        },
        name: {
          type: 'string',
          description: 'Name of the unit (e.g., gram, liter)'
        },
        symbol: {
          type: 'string',
          description: 'Symbol of the unit (e.g., g, ml)'
        },
        category: {
          type: 'string',
          description: 'Category of measurement (e.g., weight, volume)'
        },
        conversionValue: {
          type: 'number',
          description: 'Value to convert to base unit (e.g., 1g = 1, 1kg = 1000)'
        }
      }
    }
  };
  