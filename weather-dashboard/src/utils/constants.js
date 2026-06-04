export const WEATHER_DESCRIPTIONS = {
  'clear sky': '☀️ Clear Sky',
  'few clouds': '🌤️ Few Clouds',
  'scattered clouds': '☁️ Scattered Clouds',
  'broken clouds': '☁️ Broken Clouds',
  'shower rain': '🌧️ Shower Rain',
  'rain': '🌧️ Rain',
  'thunderstorm': '⛈️ Thunderstorm',
  'snow': '❄️ Snow',
  'mist': '🌫️ Mist'
};

export const FAVORITE_CITIES_KEY = 'weatherDashboard_favorites';

export const DEFAULT_CITIES = [
  'Jakarta',
  'Bandung',
  'Surabaya',
  'New York',
  'London',
  'Tokyo'
];

export const TEMP_COLORS = {
  hot: 'text-red-500',
  warm: 'text-orange-500',
  cool: 'text-blue-500',
  cold: 'text-blue-700'
};

export const getTempColor = (temp) => {
  if (temp > 30) return TEMP_COLORS.hot;
  if (temp > 20) return TEMP_COLORS.warm;
  if (temp > 10) return TEMP_COLORS.cool;
  return TEMP_COLORS.cold;
};
