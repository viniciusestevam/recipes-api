import express from 'express';
import recipeRoutes from './app/recipe/routes';

const app = express();

app.use('/recipes', recipeRoutes);

export default app;
