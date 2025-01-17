import React, {memo} from 'react';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import {Movie} from '../../types/movie';

interface WishlistCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
  onRemove: (movieId: number) => void;
}

const ListItem = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: ${({theme}) => theme.spacing.m}px;
  background-color: ${({theme}) => theme.colors.card};
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.background};
`;

export const WishlistCard = memo(
  ({movie, onPress, onRemove}: WishlistCardProps) => {
    return (
      <ListItem onPress={() => onPress(movie)} activeOpacity={0.7}>
        <MoviePoster
          source={{
            uri: `https://image.tmdb.org/t/p/w200${movie.posterPath}`,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <ContentContainer>
          <MovieTitle numberOfLines={2}>{movie.title}</MovieTitle>
          <InfoContainer>
            <YearText>{new Date(movie.releaseDate).getFullYear()}</YearText>
            <RatingText>⭐ {movie.voteAverage.toFixed(1)}</RatingText>
          </InfoContainer>
        </ContentContainer>
        <RemoveButton
          onPress={() => onRemove(movie.id)}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          activeOpacity={0.7}>
          <RemoveText>✕</RemoveText>
        </RemoveButton>
      </ListItem>
    );
  },
);

WishlistCard.displayName = 'WishlistCard';

const MoviePoster = styled(FastImage)`
  width: 60px;
  height: 90px;
  border-radius: ${({theme}) => theme.borderRadius.s}px;
`;

const ContentContainer = styled.View`
  flex: 1;
  margin-left: ${({theme}) => theme.spacing.m}px;
`;

const MovieTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.text};
  margin-bottom: ${({theme}) => theme.spacing.s}px;
`;

const InfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const YearText = styled.Text`
  color: ${({theme}) => theme.colors.textSecondary};
  font-size: 14px;
  margin-right: ${({theme}) => theme.spacing.m}px;
`;

const RatingText = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 14px;
  font-weight: 500;
`;

const RemoveButton = styled.TouchableOpacity`
  padding: ${({theme}) => theme.spacing.s}px;
  margin-left: ${({theme}) => theme.spacing.s}px;
`;

const RemoveText = styled.Text`
  color: ${({theme}) => theme.colors.error};
  font-size: 18px;
  font-weight: 500;
`;
