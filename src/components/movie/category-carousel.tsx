import React, {memo} from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import styled from 'styled-components/native';
import {Movie, MovieCategory} from '../../types/movie';
import {Title} from '../shared/typography';
import {MovieCard} from './movie-card';

interface CategoryCarouselProps {
  title: string;
  category: MovieCategory;
  movies: Movie[];
  onMoviePress: (movie: Movie) => void;
}

export const CategoryCarousel = memo(
  ({title, movies, onMoviePress}: CategoryCarouselProps) => {
    const renderItem: ListRenderItem<Movie> = ({item}) => (
      <MovieCard movie={item} onPress={onMoviePress} />
    );

    return (
      <Container>
        <CarouselTitle>{title}</CarouselTitle>
        <FlatList
          data={movies}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={contentContainerStyle}
          getItemLayout={getItemLayout}
          removeClippedSubviews={true}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={3}
        />
      </Container>
    );
  },
);

CategoryCarousel.displayName = 'CategoryCarousel';

const contentContainerStyle = {
  paddingHorizontal: 16,
};

const getItemLayout = (_: any, index: number) => ({
  length: 120,
  offset: 120 * index,
  index,
});

const Container = styled.View`
  margin-vertical: ${({theme}) => theme.spacing.m}px;
`;

const CarouselTitle = styled(Title)`
  margin-left: ${({theme}) => theme.spacing.m}px;
  margin-bottom: ${({theme}) => theme.spacing.s}px;
`;
