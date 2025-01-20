import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {WishlistCard} from '../../../src/components/wishlist/wishlist-card';
import {theme} from '../../../src/theme/theme';
import {Movie, MovieCategory} from '../../../src/types/movie';

// Mock FastImage component
jest.mock('react-native-fast-image', () => 'FastImage');

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

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('WishlistCard', () => {
  it('renders movie information correctly', () => {
    const {getByText} = renderWithTheme(
      <WishlistCard movie={mockMovie} onPress={() => {}} onRemove={() => {}} />,
    );

    expect(getByText('Test Movie')).toBeTruthy();
    expect(getByText('⭐ 8.5')).toBeTruthy();
    expect(getByText('2024')).toBeTruthy();
  });

  it('calls onPress with movie data when pressed', () => {
    const mockOnPress = jest.fn();
    const {getByText} = renderWithTheme(
      <WishlistCard
        movie={mockMovie}
        onPress={mockOnPress}
        onRemove={() => {}}
      />,
    );

    fireEvent.press(getByText('Test Movie'));
    expect(mockOnPress).toHaveBeenCalledWith(mockMovie);
  });

  it('calls onRemove with movie id when remove button is pressed', () => {
    const mockOnRemove = jest.fn();
    const {getByText} = renderWithTheme(
      <WishlistCard
        movie={mockMovie}
        onPress={() => {}}
        onRemove={mockOnRemove}
      />,
    );

    fireEvent.press(getByText('✕'));
    expect(mockOnRemove).toHaveBeenCalledWith(mockMovie.id);
  });

  it('renders movie poster with correct props', () => {
    const {UNSAFE_getByType} = renderWithTheme(
      <WishlistCard movie={mockMovie} onPress={() => {}} onRemove={() => {}} />,
    );

    const posterImage = UNSAFE_getByType('FastImage');
    expect(posterImage.props.source).toEqual({
      uri: 'https://image.tmdb.org/t/p/w200/test-path.jpg',
      priority: 'normal',
    });
    expect(posterImage.props.resizeMode).toBe('cover');
  });
});
