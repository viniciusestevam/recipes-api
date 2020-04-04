import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import RecipePuppyService from '../../src/app/recipe/service/RecipePuppyService';
import ApplicationError from '../../src/error/ApplicationError';

const axiosMock = new MockAdapter(axios);
beforeEach(() => axiosMock.resetHandlers());

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

it('should return recipes with status 200', async () => {
  const params = {
    i: 'i1, i2'
  };
  const recipe = {
    title: 'title \r\n\t',
    href: 'link',
    ingredients: 'i1, i2',
    thumbnail: 'thumbnail'
  };
  const mappedRecipe = RecipePuppyService.mapRecipe(recipe);
  axiosMock.onGet(RecipePuppyService.baseUrl, { params }).reply(200, {
    results: [recipe]
  });
  await expect(RecipePuppyService.fetchRecipes('i1, i2')).resolves.toEqual([
    mappedRecipe
  ]);
});

it('should return a mapped recipe', () => {
  const recipe = {
    title: 'title \r\n\t',
    href: 'link',
    ingredients: 'i1, i2',
    thumbnail: 'thumbnail'
  };

  const mappedRecipe = RecipePuppyService.mapRecipe(recipe);
  expect(mappedRecipe.link).toBe('link');
  expect(mappedRecipe.title).toBe('title');
  expect(mappedRecipe.ingredients).toEqual(['i1', 'i2']);
});
