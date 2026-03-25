import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { getSwaggerOptions } from './swaggerOptions';

export const setupSwagger = (app: any) => {
  const serverUrl = process.env.SWAGGER_SERVER_URL || `http://localhost:${process.env.PORT || 4000}/api`;
  const swaggerSpec = swaggerJSDoc(getSwaggerOptions(serverUrl));
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};