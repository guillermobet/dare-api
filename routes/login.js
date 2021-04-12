const express = require('express');
const insurance = require('../external/insurance');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { client_id: clientId, client_secret: clientSecret } = req.body;
    const response = await insurance.auth(clientId, clientSecret);
    if (response.code === 200) {
      res.status(response.code).send({
        token: response.data.token,
        type: response.data.type,
        expires_in: 60,
      });
    } else {
      res.status(response.code).send({
        code: response.code,
        message: response.message,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
});

module.exports = router;
