import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect} from 'react';

import {CategoryCarousel} from 'components';
import {Container} from 'components/shared';
import {useMovies, useWishlist} from 'hooks';
import {RootStackParamList} from 'navigation/types';
import {ActivityIndicator, RefreshControl, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {Movie, MovieCategory} from 'types/movie';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const WishlistButton = ({
  count,
  onPress,
}: {
  count: number;
  onPress: () => void;
}) => (
  <HeaderButton onPress={onPress}>
    <HeaderButtonText>Wishlist ({count})</HeaderButtonText>
  </HeaderButton>
);

export const HomeScreen = ({navigation}: Props) => {
  const nowPlaying = useMovies(MovieCategory.NOW_PLAYING);
  const popular = useMovies(MovieCategory.POPULAR);
  const topRated = useMovies(MovieCategory.TOP_RATED);
  const {wishlist, refresh} = useWishlist();

  useFocusEffect(
    useCallback(() => {
      refresh?.();
    }, [refresh]),
  );

  const handleWishlistPress = useCallback(() => {
    navigation.navigate('Wishlist');
  }, [navigation]);

  const headerRight = useCallback(
    () => (
      <WishlistButton count={wishlist.length} onPress={handleWishlistPress} />
    ),
    [wishlist.length, handleWishlistPress],
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, [navigation, headerRight]);

  const handleMoviePress = useCallback(
    (movie: Movie) => {
      navigation.navigate('Details', {
        movieId: movie.id,
        category: movie.category,
      });
    },
    [navigation],
  );

  const handleRefresh = useCallback(() => {
    return Promise.all([
      nowPlaying.refresh(),
      popular.refresh(),
      topRated.refresh(),
    ]);
  }, [nowPlaying, popular, topRated]);

  if (nowPlaying.isLoading || popular.isLoading || topRated.isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={
              nowPlaying.isLoading || popular.isLoading || topRated.isLoading
            }
            onRefresh={handleRefresh}
          />
        }>
        <CategoryCarousel
          title="Now Playing"
          category={MovieCategory.NOW_PLAYING}
          movies={nowPlaying.movies}
          onMoviePress={handleMoviePress}
        />
        <CategoryCarousel
          title="Popular"
          category={MovieCategory.POPULAR}
          movies={popular.movies}
          onMoviePress={handleMoviePress}
        />
        <CategoryCarousel
          title="Top Rated"
          category={MovieCategory.TOP_RATED}
          movies={topRated.movies}
          onMoviePress={handleMoviePress}
        />
      </ScrollView>
    </Container>
  );
};

const LoadingContainer = styled(Container)`
  justify-content: center;
  align-items: center;
`;

const HeaderButton = styled.TouchableOpacity`
  padding: ${({theme}) => theme.spacing.s}px;
`;

const HeaderButtonText = styled.Text`
  color: ${({theme}) => theme.colors.primary};
  font-size: 16px;
  font-weight: bold;
`;
