import { Cloud, MapPin, Droplets, Wind, Eye, Gauge } from 'lucide-react';
import { formatTemp, getWeatherIconUrl, formatWindSpeed, formatHumidity, formatPressure, getWeatherDescription } from '../utils/formatters';
import { getTempColor } from '../utils/constants';

const CurrentWeather = ({ weather, onToggleFavorite, isFavorite }) => {
  if (!weather) return null;

  const { main, weather: weatherData, wind, visibility, sys, clouds, pressure } = weather;
  const temp = formatTemp(main.temp);
  const feels_like = formatTemp(main.feels_like);
  const description = getWeatherDescription(weatherData[0].description);
  const icon = getWeatherIconUrl(weatherData[0].icon);

  return (
    <div className="w-full animate-fade-in">
      <div className="glass rounded-2xl p-8 text-white">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-gray-200 mb-2">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">
                {weather.name}, {weather.sys.country}
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <button
            onClick={() => onToggleFavorite(weather.name)}
            className="text-2xl hover:scale-110 transition-transform"
          >
            {isFavorite ? '⭐' : '☆'}
          </button>
        </div>

        {/* Temperature */}
        <div className="flex items-center gap-6 mb-8">
          <div>
            <img src={icon} alt={description} className="w-24 h-24" />
          </div>
          <div>
            <div className={`text-6xl font-bold ${getTempColor(temp)}`}>
              {temp}°C
            </div>
            <p className="text-gray-200 text-lg mt-2">{description}</p>
            <p className="text-gray-300 text-sm mt-1">Feels like {feels_like}°C</p>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <DetailCard
            icon={<Droplets className="w-5 h-5" />}
            label="Humidity"
            value={formatHumidity(main.humidity)}
          />
          <DetailCard
            icon={<Wind className="w-5 h-5" />}
            label="Wind Speed"
            value={formatWindSpeed(wind.speed)}
          />
          <DetailCard
            icon={<Eye className="w-5 h-5" />}
            label="Visibility"
            value={`${Math.round(visibility / 1000)} km`}
          />
          <DetailCard
            icon={<Gauge className="w-5 h-5" />}
            label="Pressure"
            value={formatPressure(main.pressure)}
          />
          <DetailCard
            icon={<Cloud className="w-5 h-5" />}
            label="Cloudiness"
            value={`${clouds.all}%`}
          />
          <DetailCard
            icon={<span className="text-xl">🌡️</span>}
            label="Max Temp"
            value={`${formatTemp(main.temp_max)}°C`}
          />
        </div>
      </div>
    </div>
  );
};

const DetailCard = ({ icon, label, value }) => (
  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
    <div className="flex items-center gap-2 mb-2 text-gray-200">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <p className="text-xl font-bold text-white">{value}</p>
  </div>
);

export default CurrentWeather;
