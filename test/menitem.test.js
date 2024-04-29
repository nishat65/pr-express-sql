const path = require('path');
const request = require('supertest');
const app = require('../src');
const { connectDB, db } = require('../src/utils/db');

beforeAll(async () => {
    await connectDB();
});

test('get all menuitems', async () => {
    const response = await request(app).get('/api/v1/menuitems');
    expect(response.statusCode).toBe(200);
});

test('get error when getting menuitem by id', async () => {
    const response = await request(app).get('/api/v1/menuitems/1');
    expect(response.statusCode).toBe(404);
});

test('create menuitem', async () => {
    try {
        const imagePath = path.resolve(__dirname, '../public/uploads/test.jpg');
        const response = await request(app)
            .post('/api/v1/menuitems/')
            .field('name', 'test')
            .field('description', 'test')
            .field('price', 10.0)
            .field('type', 'veg')
            .field('mealType', 'lunch')
            .field('category', 'main')
            .attach('image', imagePath);
        expect(response.statusCode).toBe(201);
    } catch (error) {
        console.log(error);
    }
});

afterEach(() => {
    jest.clearAllMocks();
});
afterAll(async () => {
    await db.sync({ force: true });
    await db.close();
});
