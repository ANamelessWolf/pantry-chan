export const InventorySchema = {
    Inventory: {
      type: 'object',
      required: ['food', 'quantity'],
      properties: {
        id: {
          type: 'string',
          description: 'Unique identifier (GUID)'
        },
        food: {
          type: 'string',
          description: 'Reference to the Food item ID'
        },
        quantity: {
          type: 'object',
          properties: {
            value: { type: 'number' },
            unit: { type: 'object' }
          }
        }
      }
    }
  };
  