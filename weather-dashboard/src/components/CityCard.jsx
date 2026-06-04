import { Loader } from 'lucide-react';
import { formatTemp, getWeatherIconUrl } from '../utils/formatters';
import { getTempColor } from '../utils/constants';

const CityCard = ({ city, weather, loading, error, onClick, onRemove, isFavorite, onToggleFavorite }) => {
  if (loading) {
    return (
      <div className="glass rounded-xl p-6 h-48 flex items-center justify-center">
        <Loader className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass rounded-xl p-6 h-48 flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-red-400 font-semibold">Error</p>
          <p className="text-sm text-gray-300 mt-2">{error}</p>
          {onRemove && (
            <button
              onClick={onRemove}
              className="mt-4 px-3 py-1 bg-red-500/80 hover:bg-red-600 rounded text-sm text-white transition-colors"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!weather) return null;

  const temp = formatTemp(weather.main.temp);
  const icon = getWeatherIconUrl(weather.weather[0].icon);

  return (
    <div
      onClick={onClick}
      className="glass rounded-xl p-6 text-white cursor-pointer hover:scale-105 transition-transform duration-300 animate-fade-in group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold">{weather.name}</h3>
          <p className="text-sm text-gray-300">{weather.sys.country}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(weather.name);
          }}
          className="text-2xl hover:scale-110 transition-transform"
        >
          {isFavorite ? '⭐' : '☆'}
        </button>
      </div>

      <div className="flex items-end gap-4 mb-4">
        <img src={icon} alt={weather.weather[0].description} className="w-16 h-16" />
        <div>
          <p className={`text-4xl font-bold ${getTempColor(temp)}`}>{temp}°C</p>
          <p className="text-sm text-gray-300 capitalize">{weather.weather[0].description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
        <div>💧 {weather.main.humidity}%</div>
        <div>💨 {Math.round(weather.wind.speed * 3.6)} km/h</div>
      </div>
    </div>
  );
};

export default CityCard;
