import request from 'supertest';
import app from '../app';

describe('Auth Routes Testing', () => {
  describe('Get Routes', () => {});

  describe('Post Routes', () => {
    it('should login', async () => {
      const res = await request(app).post('/auth/login');

      // const res = await request(app).get('/');
      // expect(res.status).toBe(200);
      // expect(res.body).toHaveProperty('message');
      // expect(res.body.message).toEqual('Hello World');
    });
  });
});
