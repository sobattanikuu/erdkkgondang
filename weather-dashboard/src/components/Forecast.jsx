import { formatDate, getWeatherIconUrl, formatTemp } from '../utils/formatters';
import { getTempColor } from '../utils/constants';

const Forecast = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;

  // Get forecast for every 24 hours (one item per day)
  const dailyForecasts = [];
  const seenDates = new Set();

  forecast.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toLocaleDateString();

    if (!seenDates.has(dateKey)) {
      seenDates.add(dateKey);
      dailyForecasts.push(item);
    }
  });

  const nextFiveDays = dailyForecasts.slice(0, 5);

  return (
    <div className="w-full animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">5-Day Forecast</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {nextFiveDays.map((item, index) => {
          const temp = formatTemp(item.main.temp);
          const icon = getWeatherIconUrl(item.weather[0].icon);
          const description = item.weather[0].description;

          return (
            <div
              key={index}
              className="glass rounded-xl p-4 text-center text-white hover:scale-105 transition-transform duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <p className="text-sm font-semibold text-gray-200 mb-3">
                {formatDate(item.dt)}
              </p>
              
              <img
                src={icon}
                alt={description}
                className="w-16 h-16 mx-auto mb-2"
              />
              
              <p className={`text-3xl font-bold mb-1 ${getTempColor(temp)}`}>
                {temp}°
              </p>
              
              <p className="text-xs text-gray-300 capitalize line-clamp-2">
                {description}
              </p>
              
              <div className="mt-3 pt-3 border-t border-white/20">
                <p className="text-xs text-gray-300">
                  {item.main.humidity}% humidity
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
