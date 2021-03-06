const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('INCIDENTS', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Deve ser capaz de criar um novo caso.', async () => {
    const response = await request(app)
      .post('/incidents')
      .set('Authorization', '31d3c2e9')
      .send({
        title: "Gato atropelado",
        description: "Gato atropelado necesitando de cuidados veterinario",
        value: 230
      });
      expect(response.body).toHaveProperty('id');
  });
});