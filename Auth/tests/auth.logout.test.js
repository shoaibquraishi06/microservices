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

test('GET /api/auth/logout clears cookie and returns 200 when token present', async () => {
  const password = 'Password123';
  const hashed = await bcrypt.hash(password, 10);

  const user = new User({
    username: 'logoutuser',
    email: 'logout@example.com',
    password: hashed,
    fullName: 'Logout',
    lastName: 'User'
  });
  await user.save();

  const token = jwt.sign({ id: user._id, username: user.username, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

  const res = await request(app)
    .get('/api/auth/logout')
    .set('Cookie', [`token=${token}`]);

  expect(res.statusCode).toBe(200);
  const cookies = res.headers['set-cookie'] || [];
  // should set a cookie for token (clearing it)
  expect(cookies.some(c => c.startsWith('token='))).toBe(true);
  // ensure the token value itself is not returned in the cookie
  expect(cookies.every(c => !c.includes(token))).toBe(true);
});

test('GET /api/auth/logout returns 200 and clears cookie when no token provided', async () => {
  const res = await request(app).get('/api/auth/logout');

  expect(res.statusCode).toBe(200);
  const cookies = res.headers['set-cookie'] || [];
  // implementation may still clear the token cookie even if none was present
  expect(cookies.some(c => c.startsWith('token='))).toBe(true);
});

test('GET /api/auth/logout clears cookie and returns 200 for invalid token', async () => {
  const res = await request(app)
    .get('/api/auth/logout')
    .set('Cookie', ['token=invalid.token.here']);

  expect(res.statusCode).toBe(200);
  const cookies = res.headers['set-cookie'] || [];
  expect(cookies.some(c => c.startsWith('token='))).toBe(true);
});
