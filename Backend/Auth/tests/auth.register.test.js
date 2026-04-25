const request = require('supertest');
const app = require('../src/app');
const setup = require('./setup');
const User = require('../src/models/user.model');

beforeAll(async () => {
  await setup.setup();
});

afterAll(async () => {
  await setup.teardown();
});

beforeEach(async () => {
  await User.deleteMany({});
});

test('POST /api/auth/register creates a user', async () => {
  const payload = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'Password123',
    fullName: 'Test',
    lastName: 'User'
  };

  const res = await request(app).post('/api/auth/register').send(payload);
  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty('id');
  expect(res.body.username).toBe(payload.username);

  const user = await User.findOne({ username: payload.username });
  expect(user).not.toBeNull();
  expect(user.email).toBe(payload.email);
  expect(user.password).not.toBe(payload.password); // should be hashed
});

test('POST /api/auth/register returns 409 for duplicate', async () => {
  const payload = {
    username: 'dupuser',
    email: 'dup@example.com',
    password: 'Password123',
    fullName: 'Dup',
    lastName: 'User'
  };

  await request(app).post('/api/auth/register').send(payload);
  const res = await request(app).post('/api/auth/register').send(payload);
  expect(res.statusCode).toBe(409);
});
