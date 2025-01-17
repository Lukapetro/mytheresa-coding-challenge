import React, {memo} from 'react';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import {Movie} from '../../types/movie';
import {Text} from '../shared/typography';

interface MovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
}

export const MovieCard = memo(({movie, onPress}: MovieCardProps) => {
  const handlePress = () => onPress(movie);

  return (
    <CardContainer onPress={handlePress}>
      <PosterImage
        source={{
          uri: `https://image.tmdb.org/t/p/w200${movie.posterPath}`,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <MovieTitle numberOfLines={1}>{movie.title}</MovieTitle>
      <RatingContainer>
        <RatingText>⭐ {movie.voteAverage.toFixed(1)}</RatingText>
      </RatingContainer>
    </CardContainer>
  );
});

MovieCard.displayName = 'MovieCard';

const CardContainer = styled.TouchableOpacity`
  width: 120px;
  margin-horizontal: ${({theme}) => theme.spacing.s}px;
  border-radius: ${({theme}) => theme.borderRadius.m}px;
  background-color: ${({theme}) => theme.colors.card};
  overflow: hidden;
`;

const PosterImage = styled(FastImage)`
  width: 120px;
  height: 180px;
`;

const MovieTitle = styled(Text)`
  font-size: 14px;
  margin: ${({theme}) => theme.spacing.s}px;
  font-weight: bold;
`;

const RatingContainer = styled.View`
  padding-horizontal: ${({theme}) => theme.spacing.s}px;
  padding-bottom: ${({theme}) => theme.spacing.s}px;
`;

const RatingText = styled(Text)`
  font-size: 12px;
  color: ${({theme}) => theme.colors.text};
  margin-bottom: 0;
`;
