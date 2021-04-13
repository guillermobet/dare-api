const axios = require('axios');
const insurance = require('../../external/insurance');

jest.mock('axios');

describe('Insurance module', () => {
  it('Should return authentication token and type', async (done) => {
    axios.post.mockImplementation(() => Promise.resolve({
      data: {
        token: 'testToken',
        type: 'testType',
      },
      status: 200,
      statusText: 'OK',
    }));

    await insurance.auth('testClientId', 'testSecret')
      .then((response) => {
        expect(response).toHaveProperty('data', {
          token: 'testToken',
          type: 'testType',
        });
        expect(response).toHaveProperty('message', 'OK');
        expect(response).toHaveProperty('code', 200);
      });
    done();
  });

  it('Should return the list of client', async (done) => {
    axios.get.mockImplementation(() => Promise.resolve({
      data: [{
        id: 'testId',
        name: 'testName',
        email: 'test@example.com',
        role: 'testRole',
      }],
      status: 200,
      headers: {
        etag: 'testEtag',
      },
    }));

    await insurance.clients()
      .then((response) => {
        expect(response).toHaveProperty('data', [{
          id: 'testId',
          name: 'testName',
          email: 'test@example.com',
          role: 'testRole',
        }]);
        expect(response).toHaveProperty('code', 200);
      });
    done();
  });

  it('Should return the list of policies', async (done) => {
    axios.get.mockImplementation(() => Promise.resolve({
      data: [{
        id: 'testId',
        amountInsured: '1000.00',
        email: 'test@example.com',
        inceptionDate: '2021-01-01T00:00:00Z',
        installmentPayment: true,
        clientId: 'testClientId',
      }],
      status: 200,
      headers: {
        etag: 'testEtag',
      },
    }));

    await insurance.policies()
      .then((response) => {
        expect(response).toHaveProperty('data', [{
          id: 'testId',
          amountInsured: '1000.00',
          email: 'test@example.com',
          inceptionDate: '2021-01-01T00:00:00Z',
          installmentPayment: true,
          clientId: 'testClientId',
        }]);
        expect(response).toHaveProperty('code', 200);
      });
    done();
  });
});
