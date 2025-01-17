import {useCallback, useEffect, useState} from 'react';
import {movieApi} from '../services/movie-api';
import {Movie, MovieCategory} from '../types/movie';

export const useMovies = (category: MovieCategory) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await movieApi.getMoviesByCategory(category);
      setMovies(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to fetch movies'),
      );
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const refresh = useCallback(() => {
    return fetchMovies();
  }, [fetchMovies]);

  return {
    movies,
    isLoading,
    error,
    refresh,
  };
};
