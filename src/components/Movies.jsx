function MoviesList({ movies }) {
  return (
    <ul className="movies">
      {movies.map((movie) => {
        return (
          <li className="movie" key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={movie.title} />
          </li>
        );
      })}
    </ul>
  );
}

function NoResults() {
  return <p>No results found!</p>;
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;

  return hasMovies ? <MoviesList movies={movies} /> : <NoResults />;
}
