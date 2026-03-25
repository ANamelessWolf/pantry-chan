import { FoodSchema } from '../schemas/food.schema';
import { FoodCategorySchema } from '../schemas/foodCategory.schema';
import { InventorySchema } from '../schemas/inventory.schema';
import { RecipeSchema } from '../schemas/recipe.schema';
import { UnitSchema } from '../schemas/unit.schema';
import { AuthSchema } from '../schemas/auth.schema';
import { FoodOutputSchema } from '../schemas/foodOutput.schema';
import { UnitOutputSchema } from '../schemas/unitOutput.schema';
import { HttpFoodResponseSchema } from '../schemas/httpFoodResponse.schema';

export const getSwaggerOptions = (serverUrl: string) => ({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pantry Planner API',
      version: '1.0.0',
      description: 'API for managing food, inventory, and recipes.',
    },
    servers: [
      {
        url: serverUrl,
        description: 'Current server',
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
        ...FoodOutputSchema,
        ...HttpFoodResponseSchema,
        ...InventorySchema,
        ...RecipeSchema,
        ...UnitSchema,
        ...UnitOutputSchema,
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
});
