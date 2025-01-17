export type RootStackParamList = {
  Home: undefined;
  Details: {movieId: number; category: string};
  Wishlist: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
