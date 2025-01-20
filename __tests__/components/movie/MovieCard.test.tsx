import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {MovieCard} from '../../../src/components/movie/movie-card';
import {theme} from '../../../src/theme/theme';
import {Movie, MovieCategory} from '../../../src/types/movie';

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

describe('MovieCard', () => {
  it('renders movie title and rating correctly', () => {
    const {getByText} = renderWithTheme(
      <MovieCard movie={mockMovie} onPress={() => {}} />,
    );

    expect(getByText('Test Movie')).toBeTruthy();
    expect(getByText('⭐ 8.5')).toBeTruthy();
  });

  it('calls onPress with movie data when pressed', () => {
    const mockOnPress = jest.fn();
    const {getByText} = renderWithTheme(
      <MovieCard movie={mockMovie} onPress={mockOnPress} />,
    );

    fireEvent.press(getByText('Test Movie'));
    expect(mockOnPress).toHaveBeenCalledWith(mockMovie);
  });
});
