import AsyncStorage from '@react-native-async-storage/async-storage';
import {act, renderHook} from '@testing-library/react-hooks';
import {useWishlist} from '../../src/hooks/use-wishlist';
import {Movie, MovieCategory} from '../../src/types/movie';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage');

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  posterPath: '/test-path.jpg',
  backdropPath: '/backdrop-path.jpg',
  voteAverage: 8.5,
  overview: 'Test overview',
  releaseDate: '2024-03-20',
  category: MovieCategory.POPULAR,
};

describe('useWishlist', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
  });

  it('should load wishlist from storage on mount', async () => {
    const storedWishlist = [mockMovie];
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(storedWishlist));

    const {result, waitForNextUpdate} = renderHook(() => useWishlist());

    // Initial state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.wishlist).toEqual([]);

    await waitForNextUpdate();

    // After loading from storage
    expect(result.current.isLoading).toBe(false);
    expect(result.current.wishlist).toEqual(storedWishlist);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(
      '@movie_browser:wishlist',
    );
  });

  it('should add movie to wishlist', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce('[]');

    const {result, waitForNextUpdate} = renderHook(() => useWishlist());
    await waitForNextUpdate();

    act(() => {
      result.current.addToWishlist(mockMovie);
    });

    expect(result.current.wishlist).toEqual([mockMovie]);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      '@movie_browser:wishlist',
      JSON.stringify([mockMovie]),
    );
  });

  it('should not add duplicate movies to wishlist', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify([mockMovie]));

    const {result, waitForNextUpdate} = renderHook(() => useWishlist());
    await waitForNextUpdate();

    act(() => {
      result.current.addToWishlist(mockMovie);
    });

    expect(result.current.wishlist).toEqual([mockMovie]);
  });

  it('should remove movie from wishlist', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify([mockMovie]));

    const {result, waitForNextUpdate} = renderHook(() => useWishlist());
    await waitForNextUpdate();

    act(() => {
      result.current.removeFromWishlist(mockMovie.id);
    });

    expect(result.current.wishlist).toEqual([]);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      '@movie_browser:wishlist',
      JSON.stringify([]),
    );
  });

  it('should check if movie is in wishlist', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify([mockMovie]));

    const {result, waitForNextUpdate} = renderHook(() => useWishlist());
    await waitForNextUpdate();

    expect(result.current.isInWishlist(mockMovie.id)).toBe(true);
    expect(result.current.isInWishlist(999)).toBe(false);
  });

  it('should handle storage errors gracefully', async () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    AsyncStorage.getItem.mockRejectedValueOnce(new Error('Storage error'));

    const {result, waitForNextUpdate} = renderHook(() => useWishlist());
    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.wishlist).toEqual([]);
    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });
});
