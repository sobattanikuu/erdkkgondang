import { useState, useEffect } from 'react';
import { FAVORITE_CITIES_KEY } from '../utils/constants';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(FAVORITE_CITIES_KEY);
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(FAVORITE_CITIES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (city) => {
    setFavorites(prev => {
      if (!prev.includes(city)) {
        return [...prev, city];
      }
      return prev;
    });
  };

  const removeFavorite = (city) => {
    setFavorites(prev => prev.filter(c => c !== city));
  };

  const isFavorite = (city) => {
    return favorites.includes(city);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};
