const request = require('supertest');
const app = require('../src');
const { connectDB, db } = require('../src/utils/db');

beforeAll(async () => {
    await connectDB();
});

test('register user when new user is created', async () => {
    const response = await request(app).post('/api/v1/auth/register').send({
        username: 'test',
        password: 'test',
        email: 'test@gmail.com',
    });
    expect(response.statusCode).toBe(201);
});

test('register user if username already exists', async () => {
    const response = await request(app).post('/api/v1/auth/register').send({
        username: 'test',
        password: 'test',
        email: 'test@gmail.com',
    });
    expect(response.statusCode).toBe(400);
});

test('login user if username is correct', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
        username: 'test',
        password: 'test',
    });
    expect(response.statusCode).toBe(200);
});

test('failed login with wrong password', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
        username: 'test',
        password: 'test1',
    });
    expect(response.statusCode).toBe(401);
});

afterAll(async () => {
    await db.sync({ force: true });
    await db.close();
});
