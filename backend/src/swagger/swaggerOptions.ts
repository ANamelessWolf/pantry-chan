import { FoodSchema } from '../schemas/food.schema';
import { FoodCategorySchema } from '../schemas/foodCategory.schema';
import { InventorySchema } from '../schemas/inventory.schema';
import { RecipeSchema } from '../schemas/recipe.schema';
import { UnitSchema } from '../schemas/unit.schema';
import { AuthSchema } from '../schemas/auth.schema';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pantry Planner API',
      version: '1.0.0',
      description: 'API for managing food, inventory, and recipes.',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        ...FoodSchema,
        ...FoodCategorySchema,
        ...InventorySchema,
        ...RecipeSchema,
        ...UnitSchema,
        ...AuthSchema
      }
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/docs/*.ts'], // 📄 Only scan documentation files
};
