
// Mock imagekit service early to avoid importing ESM-only dependencies (uuid) during tests
jest.mock('../src/service/imagekit.service', () => ({
	uploadImage: jest.fn().mockResolvedValue({ url: 'http://example.com/fake.jpg' }),
}));

// Mock the product model to avoid touching the database
jest.mock('../src/models/product.model', () => ({
	find: jest.fn(),
}));

const request = require('supertest');
const app = require('../src/app');

const Product = require('../src/models/product.model');

describe('GET /api/products', () => {
	const sampleProducts = [
		{ title: 'A', description: 'a', price: { amount: 100, currency: 'INR' } },
		{ title: 'B', description: 'b', price: { amount: 200, currency: 'INR' } },
	];

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return 200 and a list of products', async () => {
		// productModel.find(...).skip(...).limit(...) -> resolves to sampleProducts
		Product.find.mockImplementation((filter) => {
			return {
				skip: () => ({
					limit: () => Promise.resolve(sampleProducts),
				}),
			};
		});

		const res = await request(app).get('/api/products');
		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('data');
		expect(Array.isArray(res.body.data)).toBe(true);
		expect(res.body.data).toHaveLength(2);
	});

	it('should translate search query (q) into a $text filter', async () => {
		let receivedFilter;
		Product.find.mockImplementation((filter) => {
			receivedFilter = filter;
			return { skip: () => ({ limit: () => Promise.resolve([]) }) };
		});

		await request(app).get('/api/products').query({ q: 'phone' });
		expect(receivedFilter).toEqual({ $text: { $search: 'phone' } });
	});

	it('should apply minprice and maxprice filters and pass skip/limit', async () => {
		let receivedFilter;
		let receivedSkip;
		let receivedLimit;

		Product.find.mockImplementation((filter) => {
			receivedFilter = filter;
			return {
				skip: (s) => ({
					limit: (l) => {
						receivedSkip = s;
						receivedLimit = l;
						return Promise.resolve(sampleProducts);
					},
				}),
			};
		});

		const res = await request(app)
			.get('/api/products')
			.query({ minprice: '50', maxprice: '300', skip: '1', limit: '10' });

		expect(res.statusCode).toBe(200);
	expect(receivedFilter['price.amount']).toBeDefined();
	expect(receivedFilter['price.amount'].$gte).toBe(50);
	expect(receivedFilter['price.amount'].$lte).toBe(300);
		expect(receivedSkip).toBe(1);
		expect(receivedLimit).toBe(10);
	});
});
