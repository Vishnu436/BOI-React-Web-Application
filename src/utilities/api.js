// api.js
// const BASE_URL = 'http://10.5.0.15:7575'; //Local
const BASE_URL = 'http://203.193.148.25:7575'; // Production

const generateUrl = (endpoint, params = {}) => {
  let url = `${BASE_URL}${endpoint}`;
  for (const key in params) {
    url = url.replace(`:${key}`, params[key]);
  }
  return url;
};

const fetchData = async (endpoint, options = {}) => {
  const url = generateUrl(endpoint, options.params);
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', endpoint, error);
    throw error;
  }
};

const API = {
  BASE_URL: BASE_URL,
  fetchAPI: (url, payload, headerOptions) =>
    fetchData(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headerOptions,
      },
      body: JSON.stringify(payload),
    })
};

export default API;
