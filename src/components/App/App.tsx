import { useState } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { MovieGrid } from '../MovieGrid/MovieGrid';
import { MovieModal } from '../MovieModal/MovieModal';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import toast from 'react-hot-toast';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (query: string) => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      toast.error('Поле не може бути порожнім');
      return;
    }

    setMovies([]);
    setError(false);
    setIsLoading(true);

    try {
      const movies = await fetchMovies(trimmedQuery);

      if (movies.length === 0) {
        toast.error('За вашим запитом нічого не знайдено');
      }

      setMovies(movies);
    } catch (error) {
      console.error(error);
      setError(true);
      toast.error('Не вдалося завантажити фільми');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />

      {isLoading && <Loader />}

      {error && <ErrorMessage />}

      <MovieGrid movies={movies} onSelect={handleSelectMovie} />

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}
