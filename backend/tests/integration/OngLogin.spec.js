const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG Login', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Deve ser capaz logar na aplicação.', async () => {
    const ongCreate = await request(app)
      .post('/ongs')
      .send({
        name: "CAC",
        email: "cac@gmail.com",
        whatsapp: "79988720545",
        city: "Aracaju",
        uf: "SE"
      });
      expect(ongCreate.body).toHaveProperty('id');
      expect(ongCreate.body.id).toHaveLength(8);

    const response = await request(app)
      .post('/sessions')
      .send({
        id: ongCreate.body.id,
      });
      expect(response.body).toHaveProperty('name');
  });
});