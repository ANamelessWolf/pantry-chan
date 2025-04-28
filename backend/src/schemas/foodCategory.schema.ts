export const FoodCategorySchema = {
    FoodCategory: {
      type: 'object',
      required: ['name', 'description'],
      properties: {
        id: {
          type: 'string',
          description: 'Unique identifier (GUID)'
        },
        name: {
          type: 'string',
          description: 'Name of the food category'
        },
        description: {
          type: 'string',
          description: 'Detailed description about the food category'
        }
      }
    }
  };
  