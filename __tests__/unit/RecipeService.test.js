import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import GiphyService from '../../src/app/recipe/service/GiphyService';
import RecipeService from '../../src/app/recipe/service/RecipeService';

const axiosMock = new MockAdapter(axios);
const params = {
  api_key: undefined,
  q: 'test',
  limit: 1
};

it('should set recipe gifs', async () => {
  axiosMock
    .onGet(`${GiphyService.baseUrl}/search`, { params })
    .reply(200, { data: [{ bitly_url: 'test' }] });
  const recipes = [
    {
      title: 'test',
      link: 'test',
      ingredients: ['test']
    }
  ];

  RecipeService.recipes = recipes;
  await RecipeService.setRecipesGif(recipes);
  expect(RecipeService.recipes).toEqual([
    {
      title: 'test',
      link: 'test',
      ingredients: ['test'],
      gif: 'test'
    }
  ]);
});

it('should set No gifs for recipe.title on gif not found', async () => {
  axiosMock
    .onGet(`${GiphyService.baseUrl}/search`, { params })
    .reply(200, { data: [] });
  const recipes = [
    {
      title: 'test',
      link: 'test',
      ingredients: ['test']
    }
  ];
  RecipeService.recipes = recipes;
  await RecipeService.setRecipesGif(recipes);
  expect(RecipeService.recipes[0].gif).toBe('No gifs for test');
});
