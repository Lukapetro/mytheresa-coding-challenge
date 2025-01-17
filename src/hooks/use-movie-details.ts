import {useCallback, useEffect, useState} from 'react';
import {movieApi} from '../services/movie-api';
import {Movie, MovieCategory} from '../types/movie';

export const useMovieDetails = (movieId: number, category: string) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMovieDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await movieApi.getMovieDetails(
        movieId,
        category as MovieCategory,
      );
      setMovie(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch movie'));
    } finally {
      setIsLoading(false);
    }
  }, [movieId, category]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  const refresh = useCallback(() => {
    return fetchMovieDetails();
  }, [fetchMovieDetails]);

  return {
    movie,
    isLoading,
    error,
    refresh,
  };
};
