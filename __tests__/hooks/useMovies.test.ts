import {act, renderHook} from '@testing-library/react-hooks';
import {useMovies} from '../../src/hooks/use-movies';
import {movieApi} from '../../src/services/movie-api';
import {Movie, MovieCategory} from '../../src/types/movie';

// Mock the movie API
jest.mock('../../src/services/movie-api');

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Test Movie 1',
    posterPath: '/test-path-1.jpg',
    backdropPath: '/backdrop-path-1.jpg',
    voteAverage: 8.5,
    overview: 'Test overview 1',
    releaseDate: '2024-03-20',
    category: MovieCategory.POPULAR,
  },
  {
    id: 2,
    title: 'Test Movie 2',
    posterPath: '/test-path-2.jpg',
    backdropPath: '/backdrop-path-2.jpg',
    voteAverage: 7.5,
    overview: 'Test overview 2',
    releaseDate: '2024-03-21',
    category: MovieCategory.POPULAR,
  },
];

describe('useMovies', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch movies successfully', async () => {
    (movieApi.getMoviesByCategory as jest.Mock).mockResolvedValueOnce(
      mockMovies,
    );

    const {result, waitForNextUpdate} = renderHook(() =>
      useMovies(MovieCategory.POPULAR),
    );

    // Initial state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.movies).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitForNextUpdate();

    // After successful fetch
    expect(result.current.isLoading).toBe(false);
    expect(result.current.movies).toEqual(mockMovies);
    expect(result.current.error).toBeNull();
  });

  it('should handle error state', async () => {
    const error = new Error('Failed to fetch movies');
    (movieApi.getMoviesByCategory as jest.Mock).mockRejectedValueOnce(error);

    const {result, waitForNextUpdate} = renderHook(() =>
      useMovies(MovieCategory.POPULAR),
    );

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.movies).toEqual([]);
    expect(result.current.error).toEqual(error);
  });

  it('should refresh movies when calling refresh', async () => {
    (movieApi.getMoviesByCategory as jest.Mock).mockResolvedValueOnce(
      mockMovies,
    );

    const {result, waitForNextUpdate} = renderHook(() =>
      useMovies(MovieCategory.POPULAR),
    );

    await waitForNextUpdate();

    // Mock the API call for refresh
    (movieApi.getMoviesByCategory as jest.Mock).mockResolvedValueOnce([
      ...mockMovies,
      {
        id: 3,
        title: 'New Movie',
        posterPath: '/new-path.jpg',
        backdropPath: '/new-backdrop.jpg',
        voteAverage: 9.0,
        overview: 'New movie overview',
        releaseDate: '2024-03-22',
        category: MovieCategory.POPULAR,
      },
    ]);

    // Call refresh
    await act(async () => {
      await result.current.refresh();
    });

    expect(movieApi.getMoviesByCategory).toHaveBeenCalledTimes(2);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.movies).toHaveLength(3);
  });
});
