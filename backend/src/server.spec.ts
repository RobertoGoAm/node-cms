import request from 'supertest';
import app from './app';

describe('Route Testing', () => {
  describe('Get Routes', () => {
    it('should return "Hello World" when requesting /', async () => {
      const res = await request(app).get('/');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toEqual('Hello World');
    });
  });
});
