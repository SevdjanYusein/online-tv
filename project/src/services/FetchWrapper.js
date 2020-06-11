import { API_URL } from '../constants/constants';

const fetchResource = (path, userOptions = {}) => {
  const defaultOptions = {};
  const defaultHeaders = {};

  const options = {
    ...defaultOptions,
    ...userOptions,
    headers: {
      ...defaultHeaders,
      ...userOptions.headers
    }
  };

  const url = `${API_URL}${path}`;

  if (options.body && typeof options.body === 'object') {
    options.body = JSON.stringify(options.body);
  }

  let response = null;

  return fetch(url, options)
    .then(responseObject => {
      response = responseObject;
      if (response.status < 200 || response.status >= 300) {
        return response.text();
      }

      return response.json();
    })
    .then(parsedResponse => {
      if (response.status < 200 || response.status >= 300) {
        throw parsedResponse;
      }

      return Promise.resolve(parsedResponse);
    })
    .catch(error => {
      return Promise.reject(JSON.parse(error));
    });
};

export default fetchResource;
