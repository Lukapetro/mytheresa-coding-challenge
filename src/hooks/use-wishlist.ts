import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useState} from 'react';
import {Movie} from '../types/movie';

const WISHLIST_STORAGE_KEY = '@movie_browser:wishlist';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadWishlist = async () => {
    try {
      const storedWishlist = await AsyncStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load wishlist from storage on mount
  useEffect(() => {
    loadWishlist();
  }, []);

  const refresh = useCallback(() => {
    return loadWishlist();
  }, []);

  // Save wishlist to storage whenever it changes
  useEffect(() => {
    const saveWishlist = async () => {
      try {
        await AsyncStorage.setItem(
          WISHLIST_STORAGE_KEY,
          JSON.stringify(wishlist),
        );
      } catch (error) {
        console.error('Error saving wishlist:', error);
      }
    };

    if (!isLoading) {
      saveWishlist();
    }
  }, [wishlist, isLoading]);

  const addToWishlist = useCallback((movie: Movie) => {
    setWishlist(current => {
      if (current.some(item => item.id === movie.id)) {
        return current;
      }
      return [...current, movie];
    });
  }, []);

  const removeFromWishlist = useCallback((movieId: number) => {
    setWishlist(current => current.filter(movie => movie.id !== movieId));
  }, []);

  const isInWishlist = useCallback(
    (movieId: number) => wishlist.some(movie => movie.id === movieId),
    [wishlist],
  );

  return {
    wishlist,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    refresh,
  };
};
