const PUBLIC_VERSION = true;

function getApiBaseUrl() {
  if (PUBLIC_VERSION) {
    return 'https://4h0c0q25cf.execute-api.us-east-2.amazonaws.com/prod';
  }
  return 'https://96kasnoukl.execute-api.us-east-2.amazonaws.com/dev';
}

function getApiBaseUrl_v2() {
  if (PUBLIC_VERSION) {
    return 'https://df3xy7gvj2.execute-api.us-east-2.amazonaws.com/prod';
  }
  return 'https://35ooqloc6e.execute-api.us-east-2.amazonaws.com/dev';
}

export default {
  API_URL: getApiBaseUrl(),
  API_URL_v2: getApiBaseUrl_v2(),
  UxcamKey: 'dcjyl4k58nrn4z3',
  FLURRY_ANDROID_API_KEY: '8X63BHJJQMGJR45MPD5C',
  FLURRY_IOS_API_KEY: 'JZK8V6Q4F9M59R2ZXWKJ'
}
