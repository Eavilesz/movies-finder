export const Searchform = (props) => {
  const { handleSubmit, error, handleChange, search, sort, handleSort } = props;
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="movie-search">Search for a movie:</label>
      <input
        id="movie-search"
        style={{
          border: '1px solid transparent',
          borderColor: error ? 'red' : 'transparent',
        }}
        onChange={handleChange}
        value={search}
        name="query"
        placeholder="Avengers, Star Wars, The Matrix"
      />
      <input type="checkbox" onChange={handleSort} checked={sort} />
      <button type="submit">Search</button>
    </form>
  );
};
