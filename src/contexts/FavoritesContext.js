import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const FavoritesContext = createContext();

// Custom hook for using the favorites context
export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  // Load favorites from localStorage on initial render
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('carFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Update localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('carFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add car to favorites
  const addToFavorites = (car) => {
    // Check if car is already in favorites
    if (!favorites.some(fav => fav.id === car.id)) {
      setFavorites([...favorites, car]);
    }
  };

  // Remove car from favorites
  const removeFromFavorites = (carId) => {
    setFavorites(favorites.filter(car => car.id !== carId));
  };

  // Check if car is in favorites
  const isFavorite = (carId) => {
    return favorites.some(car => car.id === carId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};