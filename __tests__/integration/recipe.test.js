import supertest from 'supertest';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import app from '../../src/app';

const endpoint = '/recipes';

it('should return statusCode 200', async () => {
  const response = await supertest(app)
    .get(endpoint)
    .query({ i: 'any' })
    .send();
  expect(response.status).toBe(200);
});

it('should throw invalid params with statusCode 400', async () => {
  const response = await supertest(app)
    .get(endpoint)
    .query({ a: 'any' })
    .send();
  expect(response.status).toBe(400);
});

it('should throw too much ingredients error with statusCode 400', async () => {
  const response = await supertest(app)
    .get(endpoint)
    .query({ i: 'tomato,potato,pepper,egg' })
    .send();
  expect(response.status).toBe(400);
});

it('should throw starting i with ,', async () => {
  const response = await supertest(app).get(endpoint).query({ i: ',' });
  expect(response.status).toBe(400);
});

it('should throw recipesPuppy service is unnavailable', async () => {
  const mock = new MockAdapter(axios);
  const data = { response: true, statusText: 'error', status: 500 };
  mock.onGet(`http://www.recipepuppy.com/api?i=tomato`).reply(500, data);

  const response = await supertest(app).get(`${endpoint}?i=tomato`).send();
  expect(response.status).toBe(500);
});
