import express from 'express';
import recipeRoutes from './app/recipe/routes';
import ApplicationError from './app/helpers/ApplicationError';

const app = express();

/**
 * middlewares
 */
app.use(express.json());
app.use((err, req, res, next) => {
  ApplicationError.handleError(err, res);
});

/**
 * routes
 */
app.use('/recipes', recipeRoutes);

export default app;
