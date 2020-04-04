import { Router } from 'express';
import RecipeController from './controller/RecipeController';

const router = Router();

router.get('/', RecipeController.getRecipes);

export default router;
