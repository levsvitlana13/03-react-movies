import axios from 'axios';
import type { Movie } from '../types/movie';

interface FetchMoviesResponse {
  results: Movie[];
}

const token = import.meta.env.VITE_TMDB_TOKEN;

console.log('TOKEN:', token);

export async function fetchMovies(query: string): Promise<Movie[]> {
  console.log('Запит:', query);

  const response = await axios.get<FetchMoviesResponse>(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: {
        query,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('Відповідь API:', response.data);

  return response.data.results;
}
