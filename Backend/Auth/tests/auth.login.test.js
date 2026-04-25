const request = require('supertest');
const app = require('../src/app');
const setup = require('./setup');
const User = require('../src/models/user.model');
const bcrypt = require('bcryptjs');

beforeAll(async () => {
  await setup.setup();
});

afterAll(async () => {
  await setup.teardown();
});

beforeEach(async () => {
  await User.deleteMany({});
});

test('POST /api/auth/login returns 200 and sets cookie for valid credentials (by email)', async () => {
  const password = 'Password123';
  const hashed = await bcrypt.hash(password, 10);

  const user = new User({
    username: 'loginuser',
    email: 'login@example.com',
    password: hashed,
    fullName: 'Login',
    lastName: 'User'
  });
  await user.save();

  const res = await request(app)
    .post('/api/auth/login')
    .send({ identifier: 'login@example.com', password });

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty('user');
  expect(res.body.user.email).toBe('login@example.com');
  // cookie should be set
  const cookies = res.headers['set-cookie'] || [];
  expect(cookies.some(c => c.startsWith('token='))).toBe(true);
});

test('POST /api/auth/login returns 200 for valid credentials (by username)', async () => {
  const password = 'Password123';
  const hashed = await bcrypt.hash(password, 10);

  const user = new User({
    username: 'loginuser2',
    email: 'login2@example.com',
    password: hashed,
    fullName: 'Login2',
    lastName: 'User2'
  });
  await user.save();

  const res = await request(app)
    .post('/api/auth/login')
    .send({ identifier: 'loginuser2', password });

  expect(res.statusCode).toBe(200);
  expect(res.body.user.username).toBe('loginuser2');
});

test('POST /api/auth/login returns 401 for invalid password', async () => {
  const password = 'Password123';
  const hashed = await bcrypt.hash(password, 10);

  const user = new User({
    username: 'loginuser3',
    email: 'login3@example.com',
    password: hashed,
    fullName: 'Login3',
    lastName: 'User3'
  });
  await user.save();

  const res = await request(app)
    .post('/api/auth/login')
    .send({ identifier: 'loginuser3', password: 'WrongPassword' });

  expect(res.statusCode).toBe(401);
});

test('POST /api/auth/login returns 401 for non-existent user', async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ identifier: 'noone', password: 'doesntmatter' });

  expect(res.statusCode).toBe(401);
});
