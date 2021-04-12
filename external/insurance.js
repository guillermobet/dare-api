const axios = require('axios').default;
const environment = require('../environments/env');
const validateStatus = require('../utils/axios-error-handler');

const cache = {
  token: '',
  clients: {
    data: [],
    etag: '',
  },
  policies: {
    data: [],
    etag: '',
  },
};

const auth = async (clientId, clientSecret) => {
  try {
    const response = await axios.post(`${environment.insuranceApiEndpoint}/login`, {
      client_id: clientId,
      client_secret: clientSecret,
    });
    cache.token = `${response.data.type} ${response.data.token}`;
    return {
      code: response.status,
      message: response.statusText,
      data: response.data,
    };
  } catch (error) {
    console.error(error);
    return {
      code: error.response.status,
      message: error.response.statusText,
    };
  }
};

const clients = async () => {
  try {
    const headers = {};
    cache.token ? headers.Authorization = cache.token : () => {};
    cache.clients.etag ? headers['If-None-Match'] = cache.clients.etag : () => {};

    const response = await axios.get(`${environment.insuranceApiEndpoint}/clients`, {
      headers,
      validateStatus,
    });
    if (response.status === 200) {
      cache.clients.data = response.data;
      cache.clients.etag = response.headers.etag;
      return {
        data: response.data,
        code: response.status,
      };
    } else if (response.status === 304) {
      return {
        data: cache.clients.data,
        code: response.status,
      };
    } else {
      return {
        code: response.status,
        message: response.statusText,
      };
    }
  } catch (error) {
    console.error(error);
    return new Error(error);
  }
};

const policies = async () => {
  try {
    const headers = {};
    cache.token ? headers.Authorization = cache.token : () => {};
    cache.policies.etag ? headers['If-None-Match'] = cache.policies.etag : () => {};

    const response = await axios.get(`${environment.insuranceApiEndpoint}/policies`, {
      headers,
      validateStatus,
    });
    if (response.status === 200) {
      cache.policies.data = response.data;
      cache.policies.etag = response.headers.etag;
      return {
        data: response.data,
        code: response.status,
      };
    } else if (response.status === 304) {
      return {
        data: cache.policies.data,
        code: response.status,
      };
    } else {
      return {
        code: response.status,
        message: response.statusText,
      };
    }
  } catch (error) {
    console.error(error);
    return new Error(error);
  }
};

module.exports = {
  auth,
  clients,
  policies,
};
