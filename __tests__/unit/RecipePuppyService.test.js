import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import RecipePuppyService from '../../src/app/recipe/service/RecipePuppyService';
import ApplicationError from '../../src/error/ApplicationError';

const axiosMock = new MockAdapter(axios);

it('should throw with status !== 200 on get recipes', async () => {
  const params = {
    i: 'any'
  };
  axiosMock.onGet(RecipePuppyService.baseUrl, { params }).reply(999, {
    data: {
      statusText: 'test'
    }
  });
  await expect(RecipePuppyService.fetchRecipes('any')).rejects.toThrow(
    ApplicationError
  );
});

it('should return a mapped recipe', () => {
  const recipe = {
    title:
      'Roasted Garlic Grilling Sauce \r\n\t\t\r\n\t\r\n\t\t\r\n\t\r\n\t\t\r\n\t\r\n\t\r\n\r\n',
    href:
      'http://www.kraftfoods.com/kf/recipes/roasted-garlic-grilling-sauce-56344.aspx',
    ingredients: 'garlic, onions, hot sauce',
    thumbnail: 'http://img.recipepuppy.com/634118.jpg'
  };

  const mappedRecipe = RecipePuppyService.mapRecipe(recipe);
  expect(mappedRecipe.link).toBe(
    'http://www.kraftfoods.com/kf/recipes/roasted-garlic-grilling-sauce-56344.aspx'
  );
  expect(mappedRecipe.title).toBe('Roasted Garlic Grilling Sauce');
});
