import {API_BASE_URL, TMDB_API_KEY} from '@env';
import {Movie, MovieCategory} from '../types/movie';

interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

interface TMDBResponse {
  results: TMDBMovie[];
  page: number;
  total_pages: number;
  total_results: number;
}

class MovieApi {
  private async fetchFromTMDB<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(
        `${API_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.status_message || `HTTP error! status: ${response.status}`,
        );
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error('Error fetching from TMDB:', error);
      throw error;
    }
  }

  public async getMoviesByCategory(category: MovieCategory): Promise<Movie[]> {
    try {
      const endpoint = this.getCategoryEndpoint(category);
      const data = await this.fetchFromTMDB<TMDBResponse>(endpoint);
      return data.results.map(movie =>
        this.transformMovieData(movie, category),
      );
    } catch (error) {
      console.error(`Error fetching ${category} movies:`, error);
      throw error;
    }
  }

  public async getMovieDetails(
    id: number,
    category: MovieCategory,
  ): Promise<Movie> {
    try {
      const endpoint = `/movie/${id}`;
      const movie = await this.fetchFromTMDB<TMDBMovie>(endpoint);
      return this.transformMovieData(movie, category);
    } catch (error) {
      console.error(`Error fetching movie details for ID ${id}:`, error);
      throw error;
    }
  }

  private getCategoryEndpoint(category: MovieCategory): string {
    return `/movie/${category}`;
  }

  private transformMovieData(movie: TMDBMovie, category: MovieCategory): Movie {
    return {
      id: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      backdropPath: movie.backdrop_path,
      overview: movie.overview,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
      category,
    };
  }
}

export const movieApi = new MovieApi();
