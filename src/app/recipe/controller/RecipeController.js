import RecipeService from '../service/RecipeService';
import validateParams from '../../shared/validateParams';
import ApplicationError from '../../../error/ApplicationError';

class RecipeController {
  async getRecipes(req, res, next) {
    try {
      validateParams(req.query, ['i']);
      const response = await RecipeService.getRecipes(
        req.query.i
      ).catch((err) => ApplicationError.handleError(err, res));
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}

export default new RecipeController();
