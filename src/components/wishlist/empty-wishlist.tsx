import {Text} from 'components/shared';
import React from 'react';
import styled from 'styled-components/native';

export const EmptyWishlist = () => {
  return (
    <Container>
      <EmptyIcon>🎬</EmptyIcon>
      <Title>Your Wishlist is Empty</Title>
      <Description>
        Save movies you want to watch later by tapping the "Add to Wishlist"
        button
      </Description>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({theme}) => theme.spacing.xl}px;
`;

const EmptyIcon = styled.Text`
  font-size: 64px;
  margin-bottom: ${({theme}) => theme.spacing.l}px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text};
  margin-bottom: ${({theme}) => theme.spacing.m}px;
  text-align: center;
`;

const Description = styled(Text)`
  text-align: center;
  color: ${({theme}) => theme.colors.textSecondary};
  font-size: 16px;
`;
