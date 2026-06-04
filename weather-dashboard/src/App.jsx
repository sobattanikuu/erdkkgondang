import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import CityCard from './components/CityCard';
import FavoritesList from './components/FavoritesList';
import { useWeather } from './hooks/useWeather';
import { useFavorites } from './hooks/useFavorites';
import { DEFAULT_CITIES } from './utils/constants';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [selectedCity, setSelectedCity] = useState('Jakarta');
  const [citiesWeather, setCitiesWeather] = useState({});
  const [loadingCities, setLoadingCities] = useState({});
  const { weather, forecast, loading, error } = useWeather(selectedCity);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  // Update dark mode
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Fetch weather for default cities
  useEffect(() => {
    const citiesToFetch = [...DEFAULT_CITIES, ...favorites];
    const uniqueCities = Array.from(new Set(citiesToFetch));

    uniqueCities.forEach(city => {
      if (!citiesWeather[city]) {
        setLoadingCities(prev => ({ ...prev, [city]: true }));
        
        const { getCurrentWeather } = require('./utils/weatherApi');
        getCurrentWeather(city)
          .then(data => {
            setCitiesWeather(prev => ({ ...prev, [city]: data }));
          })
          .catch(err => {
            setCitiesWeather(prev => ({ ...prev, [city]: { error: err.message } }));
          })
          .finally(() => {
            setLoadingCities(prev => ({ ...prev, [city]: false }));
          });
      }
    });
  }, [favorites]);

  const handleToggleFavorite = (city) => {
    if (isFavorite(city)) {
      removeFavorite(city);
      setCitiesWeather(prev => {
        const newState = { ...prev };
        delete newState[city];
        return newState;
      });
    } else {
      addFavorite(city);
    }
  };

  const handleRemoveFavorite = (city) => {
    removeFavorite(city);
    setCitiesWeather(prev => {
      const newState = { ...prev };
      delete newState[city];
      return newState;
    });
  };

  const citiesToDisplay = [...DEFAULT_CITIES, ...favorites];
  const uniqueCities = Array.from(new Set(citiesToDisplay)).filter(city => city !== selectedCity);

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main gradient background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-blue-400 to-purple-500 dark:from-gray-800 dark:to-gray-900 opacity-20 pointer-events-none"></div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Search Section */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <SearchBar onSearch={setSelectedCity} loading={loading} />
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Current Weather */}
        {weather && (
          <div>
            <CurrentWeather
              weather={weather}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite(selectedCity)}
            />
          </div>
        )}

        {/* Forecast */}
        {forecast && <Forecast forecast={forecast} />}

        {/* Favorites */}
        <FavoritesList
          favorites={favorites}
          onSelectCity={setSelectedCity}
          onRemoveFavorite={handleRemoveFavorite}
        />

        {/* Other Cities Grid */}
        {uniqueCities.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Other Cities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {uniqueCities.map(city => (
                <CityCard
                  key={city}
                  city={city}
                  weather={citiesWeather[city]}
                  loading={loadingCities[city]}
                  error={citiesWeather[city]?.error}
                  onClick={() => setSelectedCity(city)}
                  onRemove={favorites.includes(city) ? () => handleRemoveFavorite(city) : null}
                  isFavorite={isFavorite(city)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
