import { useState, useEffect } from 'react';
import { getCurrentWeather, getForecast } from '../utils/weatherApi';

export const useWeather = (city) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [weatherData, forecastData] = await Promise.all([
          getCurrentWeather(city),
          getForecast(city)
        ]);
        setWeather(weatherData);
        setForecast(forecastData);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  return { weather, forecast, loading, error };
};
