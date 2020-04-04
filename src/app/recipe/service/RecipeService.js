import ApplicationError from '../../../error/ApplicationError';
import RecipePuppyService from './RecipePuppyService';
import GiphyService from './GiphyService';

class RecipeService {
  async getRecipes(ingredients) {
    this.validateIngredients(ingredients);
    await this.fetchRecipes(ingredients);
    await this.setRecipesGif();
    return {
      keywords: ingredients,
      recipes: this.recipes
    };
  }

  async fetchRecipes(ingredients) {
    this.recipes = await RecipePuppyService.fetchRecipes(ingredients);
  }

  async setRecipesGif() {
    for (const recipe of this.recipes) {
      recipe.gif = (await GiphyService.fetchGif(recipe.title)).bitly_url;
    }
  }

  validateIngredients(ingredients) {
    const ingredientsArr = ingredients.split(',');
    if (ingredientsArr.length > 3) {
      throw new ApplicationError(
        400,
        'Please provide a maximum of 3 ingredients!'
      );
    }
    if (!ingredientsArr[0].length || !ingredientsArr.pop().length) {
      throw new ApplicationError(
        400,
        'You can\'t start or finish your list of ingredients with ","'
      );
    }
  }
}

export default new RecipeService();
