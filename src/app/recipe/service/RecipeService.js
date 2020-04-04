import ApplicationError from '../../../error/ApplicationError';
import axios from 'axios';

class RecipeService {
  async getRecipes(ingredients) {
    validateIngredients(ingredients);
    const recipes = await fetchRecipes(ingredients);
    return {
      keywords: ingredients,
      recipes: recipes
    };
  }
}

async function fetchRecipes(ingredients) {
  const recipesPuppyApiEndpoit = `http://www.recipepuppy.com/api?i=${ingredients}`;
  const results = await fetchRecipePuppy(recipesPuppyApiEndpoit);
  return results.map((recipe) => mapRecipe(recipe));
}

async function fetchRecipePuppy(url) {
  try {
    const { data } = await axios.get(url);
    return data.results;
  } catch (error) {
    throw new ApplicationError(
      error.response.status,
      `An error occured when trying to fetch data from RecipesPuppy: ${error.response.data.statusText}`
    );
  }
}

function validateIngredients(ingredients) {
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

export function normalizeRecipeTitle(title) {
  return title.split(' \r')[0];
}

export function mapRecipe(result) {
  const { title, ingredients, href: link } = result;
  return {
    title: normalizeRecipeTitle(title),
    ingredients,
    link
  };
}

export default new RecipeService();
