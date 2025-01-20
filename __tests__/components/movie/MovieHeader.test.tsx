import {render} from '@testing-library/react-native';
import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {MovieHeader} from '../../../src/components/movie/movie-header';
import {theme} from '../../../src/theme/theme';
import {MovieCategory} from '../../../src/types/movie';

// Mock FastImage component
jest.mock('react-native-fast-image', () => 'FastImage');

// Mock LinearGradient component
jest.mock('react-native-linear-gradient', () => 'LinearGradient');

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('MovieHeader', () => {
  const mockProps = {
    backdropPath: '/test-backdrop.jpg',
    category: MovieCategory.POPULAR,
  };

  it('renders correctly with backdrop image', () => {
    const {getByTestId} = renderWithTheme(<MovieHeader {...mockProps} />);

    // Verify FastImage props
    const backdropImage = getByTestId('backdrop-image');
    expect(backdropImage.props.source).toEqual({
      uri: 'https://image.tmdb.org/t/p/w780/test-backdrop.jpg',
      priority: 'high',
    });
    expect(backdropImage.props.resizeMode).toBe('cover');
  });

  it('applies correct gradient colors based on category', () => {
    const {getByTestId} = renderWithTheme(<MovieHeader {...mockProps} />);

    // Verify LinearGradient props
    const gradient = getByTestId('header-gradient');
    expect(gradient.props.colors).toEqual(['transparent', '#FFF3E0']); // Popular category background color
    expect(gradient.props.locations).toEqual([0, 1]);
  });
});
