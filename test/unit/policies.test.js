const request = require('supertest');
const insurance = require('../../external/insurance');
const policies = require('../../routes/policies');
const app = require('../../app');

jest.mock('../../external/insurance');

describe('Policies module', () => {
  it('Should list all policies', async (done) => {
    insurance.policies.mockResolvedValue({
      data: [{
        id: 'testId',
        amountInsured: '1000.00',
        email: 'test@example.com',
        inceptionDate: '2021-01-01T00:00:00Z',
        installmentPayment: true,
        clientId: 'testClientId',
      }],
      code: 200,
    });

    await request(app.use(policies))
      .get('/')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('data', [{
          id: 'testId',
          amountInsured: '1000.00',
          email: 'test@example.com',
          inceptionDate: '2021-01-01T00:00:00Z',
          installmentPayment: true,
          clientId: 'testClientId',
        }]);
      });
    done();
  });

  it('Should return a policy by its id', async (done) => {
    insurance.policies.mockResolvedValue({
      data: [{
        id: 'testId',
        amountInsured: '1000.00',
        email: 'test@example.com',
        inceptionDate: '2021-01-01T00:00:00Z',
        installmentPayment: true,
        clientId: 'testClientId',
      }],
      code: 200,
    });

    await request(app.use(policies))
      .get('/testId')
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('data', [{
          id: 'testId',
          amountInsured: '1000.00',
          email: 'test@example.com',
          inceptionDate: '2021-01-01T00:00:00Z',
          installmentPayment: true,
          clientId: 'testClientId',
        }]);
      });
    done();
  });
});
