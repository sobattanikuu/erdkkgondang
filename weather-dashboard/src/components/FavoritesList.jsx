import { Star, Trash2 } from 'lucide-react';

const FavoritesList = ({ favorites, onSelectCity, onRemoveFavorite }) => {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <Star className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>No favorite cities yet. Add one by clicking the star!</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-500" />
        Favorite Cities
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {favorites.map((city) => (
          <div
            key={city}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white cursor-pointer transition-all group"
            onClick={() => onSelectCity(city)}
          >
            <span className="font-medium">{city}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveFavorite(city);
              }}
              className="ml-1 p-1 rounded-full hover:bg-white/20 transition-colors"
              aria-label={`Remove ${city} from favorites`}
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
