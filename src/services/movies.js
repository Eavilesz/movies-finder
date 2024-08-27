export const searchMovies = async ({ search }) => {
  if (search === '') return null;
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=bc62ed6b&s=${search}`
    );
    const json = await response.json();

    const movies = json.Search;

    return movies?.map((movie) => {
      return {
        id: movie.imdbID,
        year: movie.Year,
        title: movie.Title,
        poster: movie.Poster,
      };
    });
  } catch (err) {
    throw new Error('Error searching movies');
  }
};
