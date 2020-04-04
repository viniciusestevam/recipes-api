import RecipeService from '../service/RecipeService';
import validateParams from '../../shared/validateParams';

class RecipeController {
  async getRecipes(req, res, next) {
    try {
      validateParams(req.query, ['i']);
      const response = await RecipeService.getRecipes(req.query.i);
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new RecipeController();
