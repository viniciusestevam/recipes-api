import supertest from 'supertest';
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

it('should throw with no ingredients', async () => {
  const response = await supertest(app).get(endpoint).query({ i: '' });
  expect(response.status).toBe(400);
});
