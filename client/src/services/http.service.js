import axios from 'axios';

const server = axios.create({
  headers: {
    common: {
      'vsl-auth-token': null
    }
  }
});

server.interceptors.response.use(null, err => {
  const expectedError = err.response && err.response.status >= 400 && err.response.status < 500;

  if (!expectedError) {
    console.error(err);
  }

  return Promise.reject(err);
});

const setJwt = jwt => {
  server.defaults.headers.common['vsl-auth-token'] = jwt;
};

export default {
  get: server.get,
  post: server.post,
  put: server.put,
  delete: server.delete,
  crossDomain_get: axios.get,
  setJwt
};
