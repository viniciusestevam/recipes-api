import ApplicationError from '../../../error/ApplicationError';
import axios from 'axios';

class RecipePuppyService {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  async fetchRecipes(ingredients) {
    try {
      const params = { i: ingredients };
      const { data } = await axios.get(this.baseUrl, {
        params
      });
      return data.results.map((recipe) => this.mapRecipe(recipe));
    } catch (error) {
      throw new ApplicationError(
        error.response.status,
        `An error occured when trying to fetch data from RecipesPuppy: ${error.response.data.statusText}`
      );
    }
  }

  normalizeRecipeTitle(title) {
    return title.split(' \r')[0].replace('\n', '');
  }

  mapRecipe(result) {
    const { title, ingredients, href: link } = result;
    return {
      title: this.normalizeRecipeTitle(title),
      ingredients: ingredients.split(', '),
      link
    };
  }
}

export default new RecipePuppyService({
  baseUrl: `http://www.recipepuppy.com/api`
});
