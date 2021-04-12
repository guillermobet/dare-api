const express = require('express');
const insurance = require('../external/insurance');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const response = await insurance.clients();
    if (response.code === 200 || response.code === 304) {
      res.status(200).send({
        data: response.data.slice(0, limit),
      });
    } else {
      res.status(response.code).send({
        code: response.code,
        message: 'Unauthorized',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      code: 500,
      message: 'Internal Server Error',
    });
  }
  return null;
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await insurance.clients();
    if (response.code === 200 || response.code === 304) {
      const client = response.data.filter((elem) => elem.id === id);
      if (client.length) {
        res.status(200).send({
          data: client,
        });
      } else {
        res.status(404).send({
          code: 404,
          message: 'Not Found',
        });
      }
    } else {
      res.status(response.code).send({
        code: response.code,
        message: response.message,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      code: 500,
      message: 'Internal Server Error',
    });
  }
  return null;
});

router.get('/:id/policies', async (req, res) => {
  try {
    const { id } = req.params;
    const clientsResponse = await insurance.clients();
    const policiesResponse = await insurance.policies();
    if (
      (clientsResponse.code === 200 || clientsResponse.code === 304)
      && (policiesResponse.code === 200 || policiesResponse.code === 304)
    ) {
      const client = clientsResponse.data.filter((elem) => elem.id === id);
      if (client.length) {
        const clientPolicies = policiesResponse.data.filter(
          (elem) => elem.clientId === client[0].id,
        );
        if (clientPolicies.length) {
          res.status(200).send({
            data: clientPolicies,
          });
        } else {
          res.status(404).send({
            code: 404,
            message: 'Policies Not Found',
          });
        }
      } else {
        res.status(404).send({
          code: 404,
          message: 'Client Not Found',
        });
      }
    } else {
      const error = clientsResponse.code > policiesResponse.code
        ? clientsResponse
        : policiesResponse;
      res.status(clientsResponse.code).send({
        code: error.code,
        message: error.message,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      code: 500,
      message: 'Internal Server Error',
    });
  }
  return null;
});

module.exports = router;
