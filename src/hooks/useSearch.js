import { useState, useRef, useEffect } from 'react';

export function useSearch() {
  const [search, updateSearch] = useState('');
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    // To know if this is the first time we access the component
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
      return;
    }

    if (search === '') {
      setError("You can't search for an empty movie.");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("You Can't search for a movie with numbers");
      return;
    }

    if (search.length < 3) {
      setError('The search is too short');
      return;
    }
    setError(null);
  }, [search]);
  return { search, updateSearch, error };
}
