import supertest from 'supertest';
import app from '../../src/app';

describe('Routes', () => {
  it('should return ok:true', async () => {
    const response = await supertest(app).get('/recipes').send();

    expect(response.body).toStrictEqual({ ok: true });
    expect(response.status).toBe(200);
  });
});
