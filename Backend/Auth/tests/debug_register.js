const request = require('supertest');
const app = require('../src/app');

(async () => {
  const payload = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'Password123',
    fullName: 'Test',
    lastName: 'User'
  };

  const res = await request(app).post('/api/auth/register').send(payload);
  console.log('status:', res.status);
  console.log('body:', res.body);
})();
