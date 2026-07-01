import { useState } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { MovieGrid } from '../MovieGrid/MovieGrid';
import { MovieModal } from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService';
import toast from 'react-hot-toast';

export default function App() {
  const [movies, setMovies] = useState<any[]>([]);

  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);

  const handleSubmit = async (query: string) => {
    console.log('handleSubmit:', query);
    const trimmed = query.trim();

    if (!trimmed) {
      toast.error('Поле не може бути порожнім');
      return;
    }

    try {
      toast.success(`Шукаємо: ${trimmed}`);
      const data = await fetchMovies(trimmed);
      console.log('Отримані фільми:', data);
      setMovies(data);
    } catch (error) {
      toast.error('Помилка завантаження фільмів');
      console.error('Помилка:', error);
    }
  };

  const handleSelectMovie = (movie: any) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />

      <MovieGrid movies={movies} onSelect={handleSelectMovie} />

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}
