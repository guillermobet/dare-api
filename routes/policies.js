const express = require('express');
const insurance = require('../external/insurance');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const response = await insurance.policies();
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
    const response = await insurance.policies();
    if (response.code === 200 || response.code === 304) {
      const policy = response.data.filter((elem) => elem.id === id);
      if (policy.length) {
        res.status(200).send({
          data: policy,
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

module.exports = router;
