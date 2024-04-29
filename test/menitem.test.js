const request = require('supertest');
const app = require('../src');
const { connectDB, db } = require('../src/utils/db');

beforeAll(async () => {
    await connectDB();
});
afterEach(() => {
    jest.clearAllMocks();
});
afterAll(async () => {
    await db.sync({ force: true });
    await db.close();
});

test('get all menuitems', async () => {
    const response = await request(app).get('/api/v1/menuitems');
    expect(response.statusCode).toBe(200);
});

test('get error when getting menuitem by id', async () => {
    const response = await request(app).get('/api/v1/menuitems/1');
    expect(response.statusCode).toBe(404);
});
