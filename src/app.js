import express from 'express';
import recipeRoutes from './app/recipe/routes';

const app = express();

/**
 * middlewares
 */
app.use(express.json());

/**
 * routes
 */
app.get('/', (req, res) => res.send({ ok: true }));
app.use('/recipes', recipeRoutes);

export default app;
