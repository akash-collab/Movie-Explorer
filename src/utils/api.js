const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (endpoint, page = 1, query = "") => {
  try {
    const url = query
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`
      : `${BASE_URL}/movie/${endpoint}?api_key=${API_KEY}&language=en-US&page=${page}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Fetch failed:", err);
    throw new Error("Failed to fetch movies");
  }
};

export const fetchFilteredMovies = async (year, genre, page = 1) => {
  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}`
    + (year ? `&primary_release_year=${year}` : "")
    + (genre ? `&with_genres=${genre}` : "")
    + "&sort_by=popularity.desc";

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Filter fetch failed:", err);
    throw new Error("Failed to fetch filtered movies");
  }
};