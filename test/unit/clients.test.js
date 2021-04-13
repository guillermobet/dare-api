const request = require('supertest');
const insurance = require('../../external/insurance');
const clients = require('../../routes/clients');
const app = require('../../app');

jest.mock('../../external/insurance');

describe('Clients module', () => {
  it('Should list all clients', async (done) => {
    insurance.clients.mockResolvedValue({
      data: [{
        id: 'testId',
        name: 'testName',
        email: 'test@example.com',
        role: 'testRole',
      }],
      code: 200,
    });

    await request(app.use(clients))
      .get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('data', [{
          id: 'testId',
          name: 'testName',
          email: 'test@example.com',
          role: 'testRole',
        }]);
      });
    done();
  });

  it('Should return a client by its id', async (done) => {
    insurance.clients.mockResolvedValue({
      data: [{
        id: 'testId',
        name: 'testName',
        email: 'test@example.com',
        role: 'testRole',
      }],
      code: 200,
    });

    await request(app.use(clients))
      .get('/testId')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('data', [{
          id: 'testId',
          name: 'testName',
          email: 'test@example.com',
          role: 'testRole',
        }]);
      });
    done();
  });

  it("Should return a client's policies by the client's id", async (done) => {
    insurance.clients.mockResolvedValue({
      data: [{
        id: 'testId',
        name: 'testName',
        email: 'test@example.com',
        role: 'testRole',
      }],
      code: 200,
    });

    insurance.policies.mockResolvedValue({
      data: [{
        id: 'testPolicyId',
        amountInsured: '1000.00',
        email: 'test@example.com',
        inceptionDate: '2021-01-01T00:00:00Z',
        installmentPayment: true,
        clientId: 'testId',
      }],
      code: 200,
    });

    await request(app.use(clients))
      .get('/testId/policies')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('data', [{
          id: 'testPolicyId',
          amountInsured: '1000.00',
          email: 'test@example.com',
          inceptionDate: '2021-01-01T00:00:00Z',
          installmentPayment: true,
          clientId: 'testId',
        }]);
      });
    done();
  });
});
