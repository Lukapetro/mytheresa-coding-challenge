import React, {memo} from 'react';
import styled from 'styled-components/native';
import {CATEGORY_STYLES, MovieCategory} from '../../types/movie';
import {ButtonText} from '../shared';

interface CategoryButtonProps {
  category: MovieCategory;
  onPress: () => void;
  isInWishlist?: boolean;
}

export const CategoryButton = memo(
  ({category, onPress, isInWishlist}: CategoryButtonProps) => {
    const style = CATEGORY_STYLES[category];

    return (
      <StyledButton
        onPress={onPress}
        style={{backgroundColor: style.accentColor}}
        activeOpacity={0.8}
        testID="category-button">
        <StyledButtonText isInWishlist={isInWishlist}>
          {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </StyledButtonText>
      </StyledButton>
    );
  },
);

CategoryButton.displayName = 'CategoryButton';

const StyledButton = styled.TouchableOpacity`
  padding-vertical: ${({theme}) => theme.spacing.m}px;
  padding-horizontal: ${({theme}) => theme.spacing.l}px;
  border-radius: ${({theme}) => theme.borderRadius.m}px;
  align-items: center;
  justify-content: center;
  margin-top: ${({theme}) => theme.spacing.m}px;
`;

const StyledButtonText = styled(ButtonText)<{isInWishlist?: boolean}>`
  color: ${({theme}) => theme.colors.white};
  font-weight: bold;
  margin: 0;
`;
