import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './swaggerOptions';

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: any) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};