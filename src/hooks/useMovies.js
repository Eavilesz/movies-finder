import { useRef, useState, useMemo, useCallback } from 'react';
import { searchMovies } from '../services/movies';

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // This variable is to keep track of the last search, so we avoid doing a search with the same input
  const previousSearch = useRef(search);

  // We pass the search value as a prop so that we don't need to put it into the dependencies array
  const getMovies = useCallback(async ({ search }) => {
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
  }, []);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, loading };
}
