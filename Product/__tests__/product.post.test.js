const request = require('supertest');
const app = require('../src/app');

jest.mock('../src/service/imagekit.service', () => ({
  uploadImage: jest.fn().mockResolvedValue({
    url: 'https://ik.imagekit.io/test/image.jpg',
    thumbnail: 'https://ik.imagekit.io/test/thumb.jpg',
    fileId: 'file_123'
  })
}));

// Mock Product model to avoid DB calls
jest.mock('../src/models/product.model', () => ({
  create: jest.fn(async (data) => ({
    _id: 'prod_1',
    ...data
  }))
}));

describe('POST /api/products', () => {
  it('should create a product with image upload', async () => {
    const buffer = Buffer.from('fake image content');

    const res = await request(app)
      .post('/api/products')
      .field('title', 'Test Product')
      .field('description', 'A product')
      .field('price', '99')
      .field('currency', 'USD')
      .field('seller', '507f1f77bcf86cd799439011')
      .attach('image', buffer, { filename: 'test.jpg', contentType: 'image/jpeg' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Test Product');
    expect(res.body.images.length).toBe(1);
    expect(res.body.images[0].url).toBe('https://ik.imagekit.io/test/image.jpg');
  });
});
