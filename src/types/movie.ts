export enum MovieCategory {
  NOW_PLAYING = 'now_playing',
  POPULAR = 'popular',
  TOP_RATED = 'top_rated',
}

export interface Movie {
  id: number;
  title: string;
  posterPath: string;
  backdropPath: string;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  category: MovieCategory;
}

export interface CategoryStyle {
  font: string;
  buttonVariant: 'primary' | 'secondary' | 'tertiary';
  backgroundColor: string;
  accentColor: string;
}

export const CATEGORY_STYLES: Record<MovieCategory, CategoryStyle> = {
  [MovieCategory.NOW_PLAYING]: {
    font: 'Roboto',
    buttonVariant: 'primary',
    backgroundColor: '#E8F4F8',
    accentColor: '#2196F3',
  },
  [MovieCategory.POPULAR]: {
    font: 'Montserrat',
    buttonVariant: 'secondary',
    backgroundColor: '#FFF3E0',
    accentColor: '#FF9800',
  },
  [MovieCategory.TOP_RATED]: {
    font: 'Poppins',
    buttonVariant: 'tertiary',
    backgroundColor: '#F3E5F5',
    accentColor: '#9C27B0',
  },
};
