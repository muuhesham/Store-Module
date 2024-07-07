const request = require('supertest');
const app = require('./node.js');
const con = require('./db/connection.js');

describe('Category API Endpoints', () => {
    let categoryId;
    
    it('should create a new category', async () => {
        const res = await request(app).post('/category').send({ name: 'Test Category' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        categoryId = res.body.id;
    });

    
    it('should fetch all categories', async () => {
        const res = await request(app).get('/category');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.result)).toBe(true);
    });

    
    it('should update an existing category', async () => {
        const res = await request(app).put(`/category/${categoryId}`).send({ name: 'Updated Category' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('the category updated');
    });

    
    it('should delete an existing category', async () => {
        const res = await request(app).delete(`/category/${categoryId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('the category deleted');
    });
});
