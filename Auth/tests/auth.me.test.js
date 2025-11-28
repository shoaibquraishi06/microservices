const request = require('supertest');
const app = require('../src/app');
const setup = require('./setup');
const User = require('../src/models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

beforeAll(async () => {
  await setup.setup();
});

afterAll(async () => {
  await setup.teardown();
});

beforeEach(async () => {
  await User.deleteMany({});
});

test('GET /api/auth/me returns 200 and user for valid cookie token', async () => {
  const password = 'Password123';
  const hashed = await bcrypt.hash(password, 10);

  const user = new User({
    username: 'meuser',
    email: 'me@example.com',
    password: hashed,
    fullName: 'Me',
    lastName: 'User'
  });
  await user.save();

  const token = jwt.sign({ id: user._id, username: user.username, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

  const res = await request(app)
    .get('/api/auth/me')
    .set('Cookie', [`token=${token}`]);

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty('user');
  expect(res.body.user.email).toBe('me@example.com');
  // password should not be returned
  expect(res.body.user).not.toHaveProperty('password');
});

test('GET /api/auth/me returns 401 when no token provided', async () => {
  const res = await request(app).get('/api/auth/me');
  expect(res.statusCode).toBe(401);
});

test('GET /api/auth/me returns 401 for invalid token', async () => {
  const res = await request(app)
    .get('/api/auth/me')
    .set('Cookie', ['token=invalid.token.here']);

  expect(res.statusCode).toBe(401);
});

test('GET /api/auth/me accepts token from register/login cookie shape', async () => {
  // ensure compatibility with cookie-based token created during register/login
  const password = 'Password123';
  const hashed = await bcrypt.hash(password, 10);

  const user = new User({
    username: 'meuser2',
    email: 'me2@example.com',
    password: hashed,
    fullName: 'Me2',
    lastName: 'User2'
  });
  await user.save();

  const token = jwt.sign({ id: user._id, username: user.username, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

  const res = await request(app)
    .get('/api/auth/me')
    .set('Cookie', [`token=${token}; HttpOnly; Path=/;`]);

  expect(res.statusCode).toBe(200);
  expect(res.body.user.email).toBe('me2@example.com');
});
