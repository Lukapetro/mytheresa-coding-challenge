import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Container} from 'components/shared';
import {EmptyWishlist, WishlistCard} from 'components/wishlist';
import {useWishlist} from 'hooks';
import React, {useCallback} from 'react';
import {ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import {Movie} from 'types/movie';
import {RootStackParamList} from '../navigation/types';
import {Theme} from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Wishlist'>;

export const WishlistScreen = ({navigation}: Props) => {
  const {wishlist, isLoading, removeFromWishlist} = useWishlist();
  const theme = useTheme() as Theme;

  const handleMoviePress = useCallback(
    (movie: Movie) => {
      navigation.navigate('Details', {
        movieId: movie.id,
        category: movie.category,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item}: {item: Movie}) => (
      <WishlistCard
        movie={item}
        onPress={handleMoviePress}
        onRemove={removeFromWishlist}
      />
    ),
    [handleMoviePress, removeFromWishlist],
  );

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <FlatList
        data={wishlist}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={listContentStyle}
        style={listStyle}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyWishlist />}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => null}
            colors={[theme.colors.primary]}
          />
        }
      />
    </Container>
  );
};

const LoadingContainer = styled(Container)`
  justify-content: center;
  align-items: center;
`;

const listStyle = {
  flex: 1,
  width: '100%' as const,
};

const listContentStyle = {
  flexGrow: 1,
};
