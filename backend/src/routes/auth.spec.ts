import request from 'supertest';
import app from '../app';

describe('Auth Routes Testing', () => {
  describe('Get Routes', () => {});

  describe('Post Routes', () => {
    it('should login', async () => {
      const res = await request(app).post('/auth/login').send({
        email: 'test@email.com',
        password: 'p4$w004rd',
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toEqual('Hello World');
    });

    it('should not login if email is missing or empty', async () => {
      const res = await request(app).post('/auth/login').send({
        email: '',
        password: 'p4$w004rd',
      });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Must provide both email and password.');
    });

    it('should not login if password is missing or empty', async () => {
      const res = await request(app).post('/auth/login').send({
        email: 'test@email.com',
        password: '',
      });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Must provide both email and password.');
    });
  });
});
