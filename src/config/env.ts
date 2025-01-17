import Config from 'react-native-config';

if (!Config.TMDB_API_KEY) {
  throw new Error('TMDB_API_KEY is not defined in environment variables');
}

if (!Config.API_BASE_URL) {
  throw new Error('API_BASE_URL is not defined in environment variables');
}

export const ENV = {
  TMDB_API_KEY: Config.TMDB_API_KEY,
  API_BASE_URL: Config.API_BASE_URL,
} as const;
