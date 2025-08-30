import { useState, useEffect } from "react";

export default function FilterBar({ movies, setFiltered }) {
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    let filtered = movies;
    if (year) {
      filtered = filtered.filter((m) => m.release_date?.startsWith(year));
    }
    if (genre) {
      filtered = filtered.filter((m) => m.genre_ids.includes(Number(genre)));
    }
    setFiltered(filtered);
  }, [year, genre, movies]);

  return (
    <div className="bg-white shadow rounded-lg p-4 my-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
      <input
        type="number"
        placeholder="Year"
        className="p-2 border rounded w-full sm:w-40"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <select
        className="p-2 border rounded w-full sm:w-40"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        <option value="28">Action</option>
        <option value="12">Adventure</option>
        <option value="16">Animation</option>
        <option value="35">Comedy</option>
        <option value="80">Crime</option>
        <option value="99">Documentary</option>
        <option value="18">Drama</option>
        <option value="10751">Family</option>
        <option value="14">Fantasy</option>
        <option value="36">History</option>
        <option value="27">Horror</option>
        <option value="10402">Music</option>
        <option value="9648">Mystery</option>
        <option value="10749">Romance</option>
        <option value="878">Science Fiction</option>
        <option value="10770">TV Movie</option>
        <option value="53">Thriller</option>
        <option value="10752">War</option>
        <option value="37">Western</option>
      </select>
    </div>
  );
}