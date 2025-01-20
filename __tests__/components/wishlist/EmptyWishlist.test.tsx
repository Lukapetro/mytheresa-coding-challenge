import {render} from '@testing-library/react-native';
import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {EmptyWishlist} from '../../../src/components/wishlist/empty-wishlist';
import {theme} from '../../../src/theme/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('EmptyWishlist', () => {
  it('renders empty state message correctly', () => {
    const {getByText} = renderWithTheme(<EmptyWishlist />);

    expect(getByText('🎬')).toBeTruthy();
    expect(getByText('Your Wishlist is Empty')).toBeTruthy();
    expect(
      getByText(
        'Save movies you want to watch later by tapping the "Add to Wishlist" button',
      ),
    ).toBeTruthy();
  });
});
