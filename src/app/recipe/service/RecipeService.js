import ApplicationError from '../../../error/ApplicationError';
import RecipePuppyService from './RecipePuppyService';
import GiphyService from './GiphyService';

class RecipeService {
  async getRecipes(ingredients) {
    this.validateIngredients(ingredients);
    await this.fetchRecipes(ingredients);
    await this.setRecipesGif();
    return {
      keywords: ingredients.split(', '),
      recipes: this.recipes
    };
  }

  async fetchRecipes(ingredients) {
    this.recipes = await RecipePuppyService.fetchRecipes(ingredients);
  }

  async setRecipesGif() {
    for (const recipe of this.recipes) {
      const gif = await GiphyService.fetchGif(recipe.title);
      if (gif) {
        recipe.gif = gif.bitly_url;
      } else {
        recipe.gif = `No gifs for ${recipe.title}`;
      }
    }
  }

  validateIngredients(ingredients) {
    const ingredientsArr = ingredients.split(',');
    if (!ingredients.length) {
      throw new ApplicationError(
        400,
        'Please provide a minimum of 1 ingredient'
      );
    }
    if (ingredientsArr.length > 3) {
      throw new ApplicationError(
        400,
        'Please provide a maximum of 3 ingredients!'
      );
    }
    if (!ingredientsArr[0].length || !ingredientsArr.pop().length) {
      throw new ApplicationError(
        400,
        "You can't start or finish your list of ingredients with ,"
      );
    }
  }
}

export default new RecipeService();
