import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

if (!API_KEY) {
  console.warn('⚠️ OpenWeatherMap API Key not found. Set VITE_WEATHER_API_KEY in .env');
}

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric'
  }
});

/**
 * Get current weather for a city
 * @param {string} city - City name
 * @returns {Promise}
 */
export const getCurrentWeather = async (city) => {
  try {
    const response = await weatherApi.get('/weather', {
      params: { q: city }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch weather for ${city}`);
  }
};

/**
 * Get weather by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise}
 */
export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await weatherApi.get('/weather', {
      params: { lat, lon }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather by coordinates');
  }
};

/**
 * Get 5-day forecast for a city
 * @param {string} city - City name
 * @returns {Promise}
 */
export const getForecast = async (city) => {
  try {
    const response = await weatherApi.get('/forecast', {
      params: { q: city }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch forecast for ${city}`);
  }
};

/**
 * Get 5-day forecast by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise}
 */
export const getForecastByCoords = async (lat, lon) => {
  try {
    const response = await weatherApi.get('/forecast', {
      params: { lat, lon }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch forecast by coordinates');
  }
};

export default weatherApi;
