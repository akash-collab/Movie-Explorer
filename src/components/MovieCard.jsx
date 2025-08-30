export default function MovieCard({ movie }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out overflow-hidden cursor-pointer">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image"
        }
        alt={movie.title}
        className="w-full h-60 sm:h-72 object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
          {movie.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600">
          {movie.release_date?.split("-")[0] || "N/A"}
        </p>
      </div>
    </div>
  );
}