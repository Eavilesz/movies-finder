import './App.css';
import { useState, useCallback } from 'react';

import { Movies } from './components/Movies';
import { Searchform } from './components/SearchForm';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';

import debounce from 'just-debounce-it';

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 500),
    []
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

  return (
    <div className="page">
      <header>
        <h1>Movies Finder</h1>
        <Searchform
          handleSubmit={handleSubmit}
          error={error}
          handleChange={handleChange}
          search={search}
          sort={sort}
          handleSort={handleSort}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>{loading ? <p>Loading</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
