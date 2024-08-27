import { useRef, useState } from 'react';
import { searchMovies } from '../services/movies';

export function useMovies({ search }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // This variable is to keep track of the last search, so we avoid doing a search with the same input
  const previousSearch = useRef(search);

  const getMovies = async () => {
    // Don't forget to use current from the ref!!
    if (search === previousSearch.current) return;
    try {
      setLoading(true);
      setError(null);
      // This is to avoid doing a search if we have the same input
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { movies, getMovies, loading };
}
