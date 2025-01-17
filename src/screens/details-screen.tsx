import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {RootStackParamList} from '../navigation/types';

import {CategoryButton, MovieHeader} from 'components';
import {useMovieDetails, useWishlist} from 'hooks';
import {Container} from '../components/shared';
import {CATEGORY_STYLES, MovieCategory} from '../types/movie';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export const DetailsScreen = ({route}: Props) => {
  const {movieId, category} = route.params;
  const {movie, isLoading, error} = useMovieDetails(movieId, category);
  const {addToWishlist, removeFromWishlist, isInWishlist} = useWishlist();

  const handleWishlistPress = useCallback(() => {
    if (!movie) {
      return;
    }

    if (isInWishlist(movie.id)) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie);
    }
  }, [movie, addToWishlist, removeFromWishlist, isInWishlist]);

  if (isLoading || !movie) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" testID="loading-indicator" />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <ErrorText>Error loading movie details</ErrorText>
      </ErrorContainer>
    );
  }

  const style = CATEGORY_STYLES[movie.category as MovieCategory];

  return (
    <Container>
      <StyledScrollView>
        <MovieHeader
          backdropPath={movie.backdropPath}
          category={movie.category as MovieCategory}
        />
        <ContentContainer
          style={{
            backgroundColor: style.backgroundColor,
          }}>
          <MovieTitle style={{fontFamily: style.font}}>
            {movie.title}
          </MovieTitle>
          <ReleaseDate>Released: {movie.releaseDate}</ReleaseDate>
          <Rating>⭐ {movie.voteAverage.toFixed(1)}</Rating>
          <Overview>{movie.overview}</Overview>
        </ContentContainer>
      </StyledScrollView>
      <ButtonContainer style={{backgroundColor: style.backgroundColor}}>
        <CategoryButton
          category={movie.category as MovieCategory}
          onPress={handleWishlistPress}
          isInWishlist={isInWishlist(movie.id)}
        />
      </ButtonContainer>
    </Container>
  );
};

const LoadingContainer = styled(Container)`
  justify-content: center;
  align-items: center;
`;

const ErrorContainer = styled(Container)`
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.Text`
  color: ${({theme}) => theme.colors.error};
  font-size: 16px;
`;

const ContentContainer = styled.View`
  flex: 1;
  padding: ${({theme}) => theme.spacing.l}px;
  padding-bottom: 80px;
  border-top-left-radius: ${({theme}) => theme.borderRadius.l}px;
  border-top-right-radius: ${({theme}) => theme.borderRadius.l}px;
  margin-top: -20px;
`;

const MovieTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text};
  margin-bottom: ${({theme}) => theme.spacing.s}px;
`;

const ReleaseDate = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.colors.textSecondary};
  margin-bottom: ${({theme}) => theme.spacing.s}px;
`;

const Rating = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.text};
  margin-bottom: ${({theme}) => theme.spacing.m}px;
`;

const Overview = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: ${({theme}) => theme.colors.text};
  margin-bottom: ${({theme}) => theme.spacing.l}px;
`;

const ButtonContainer = styled.View`
  padding: ${({theme}) => theme.spacing.m}px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const StyledScrollView = styled(ScrollView).attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})``;
