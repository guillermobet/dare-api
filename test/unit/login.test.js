const request = require('supertest');
const insurance = require('../../external/insurance');
const login = require('../../routes/login');
const app = require('../../app');

jest.mock('../../external/insurance');

describe('Login module', () => {
  it('Should return the access token, access type and expiration time', async (done) => {
    insurance.auth.mockResolvedValue({
      data: {
        token: 'testToken',
        type: 'Bearer',
      },
      code: 200,
    });

    await request(app.use(login))
      .post('/')
      .send({
        client_id: 'foo',
        client_secret: 'bar',
      })
      .set('Accept', 'application/json')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('token', 'testToken');
        expect(response.body).toHaveProperty('type', 'Bearer');
        expect(response.body).toHaveProperty('expires_in', 60);
      });
    done();
  });

  it('Should return a 400 (Bad Request) message', async (done) => {
    insurance.auth.mockResolvedValue({
      code: 400,
      message: "body should have required property 'client_secret'",
    });

    await request(app.use(login))
      .post('/')
      .send({
        client_id: 'foo',
      })
      .set('Accept', 'application/json')
      .expect(400)
      .then((response) => {
        expect(response.body).toHaveProperty('message', "body should have required property 'client_secret'");
        expect(response.body).toHaveProperty('code', 400);
      });
    done();
  });

  it('Should return a 401 (Unauthorized) message', async (done) => {
    insurance.auth.mockResolvedValue({
      code: 401,
      message: 'invalid secret or client id',
    });

    await request(app.use(login))
      .post('/')
      .send({
        client_id: 'foo',
        client_secret: 'baz',
      })
      .set('Accept', 'application/json')
      .expect(401)
      .then((response) => {
        expect(response.body).toHaveProperty('message', 'invalid secret or client id');
        expect(response.body).toHaveProperty('code', 401);
      });
    done();
  });
});
