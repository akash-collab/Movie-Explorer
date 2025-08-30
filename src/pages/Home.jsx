import { useEffect, useState } from "react";
import { fetchMovies } from "../utils/api";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import FilterBar from "../components/FilterBar";
import Loader from "../components/Loader";
import BackToTop from "../components/BackToTop";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [category, setCategory] = useState("now_playing");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setMovies([]);
        setFiltered([]);
        setPage(1);
        loadMovies(1);
    }, [category, search]);

    const loadMovies = async (pageNum) => {
        setLoading(true);
        try {
            const data = await fetchMovies(category, pageNum, search);

            setMovies((prev) => {
                const merged = [...prev, ...data.results];
                return Array.from(new Map(merged.map((m) => [m.id, m])).values());
            });

            setFiltered((prev) => {
                const merged = [...prev, ...data.results];
                return Array.from(new Map(merged.map((m) => [m.id, m])).values());
            });
        } catch (e) {
            console.error("Error loading movies:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let throttle;
        const handleScroll = () => {
            if (throttle) return;
            throttle = setTimeout(() => {
                if (
                    window.innerHeight + window.scrollY >=
                    document.body.offsetHeight - 500
                ) {
                    setPage((prev) => {
                        const next = prev + 1;
                        loadMovies(next);
                        return next;
                    });
                }
                throttle = null;
            }, 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [category, search]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar category={category} setCategory={setCategory} setSearch={setSearch} />

            <div className="max-w-6xl mx-auto px-4">
                <FilterBar movies={movies} setFiltered={setFiltered} />
            </div>

            <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6">
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
                        {filtered.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                ) : (
                    !loading && (
                        <p className="text-center text-gray-600 text-lg py-10">
                            No results found
                        </p>
                    )
                )}
            </div>
            <BackToTop />
            {loading && <Loader />}
        </div>
    );
}