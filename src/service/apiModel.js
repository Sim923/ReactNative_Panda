import AppConfig from './../config';

const { API_URL, API_URL_v2 } = AppConfig;

export const apiModels = async (url, method, parameters, token, isNewAPI = false) => {
  let ret = null;
  let queryURL = '';
  let params = {};
  try {
    queryURL = isNewAPI ? `${API_URL_v2}/${url}` : `${API_URL}/${url}`;
    const body = JSON.stringify(parameters);
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token && token !== '') {
      headers.authorization = token;
    }
    params = { headers, method };
    if (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT' ||
      method.toUpperCase() === 'DELETE' || method.toUpperCase() === 'PATCH') {
      params.body = body;
    }
    // eslint-disable-next-line
    const response = await fetch(queryURL, params);

    if (response.status === 401) {
      ret = { error: true, success: false, errorCode: -1 };
    } else {
      ret = await response.json();
    }

    if (response.status >= 400) {
      // console.info('response', response);
    }
  } catch (err) {
    ret = { error: true, success: false, errorCode: -1 };
  }
  return ret;
};
