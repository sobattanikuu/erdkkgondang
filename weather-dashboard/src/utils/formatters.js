/**
 * Format temperature
 * @param {number} temp - Temperature in celsius
 * @returns {string}
 */
export const formatTemp = (temp) => {
  return Math.round(temp);
};

/**
 * Format date to readable format
 * @param {number} timestamp - Unix timestamp
 * @returns {string}
 */
export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Format time to readable format
 * @param {number} timestamp - Unix timestamp
 * @returns {string}
 */
export const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Format wind speed
 * @param {number} speed - Speed in m/s
 * @returns {string}
 */
export const formatWindSpeed = (speed) => {
  return `${Math.round(speed * 3.6)} km/h`; // Convert m/s to km/h
};

/**
 * Get weather icon URL
 * @param {string} iconCode - Icon code from API
 * @returns {string}
 */
export const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
};

/**
 * Get weather description
 * @param {string} description - Description from API
 * @returns {string}
 */
export const getWeatherDescription = (description) => {
  return description.charAt(0).toUpperCase() + description.slice(1);
};

/**
 * Format pressure
 * @param {number} pressure - Pressure in hPa
 * @returns {string}
 */
export const formatPressure = (pressure) => {
  return `${pressure} hPa`;
};

/**
 * Format humidity
 * @param {number} humidity - Humidity percentage
 * @returns {string}
 */
export const formatHumidity = (humidity) => {
  return `${humidity}%`;
};
