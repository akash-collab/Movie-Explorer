import { useState, useRef, useEffect } from "react";

export default function Navbar({ category, setCategory, setSearch }) {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState([]);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const debounceRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecent(saved);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setSearch(value);

      if (value.trim()) {
        let updated = [value, ...recent.filter((r) => r !== value)];
        updated = updated.slice(0, 5);
        setRecent(updated);
        localStorage.setItem("recentSearches", JSON.stringify(updated));
      }
    }, 500);
  };

  const categories = [
    { key: "now_playing", label: "Now Playing" },
    { key: "popular", label: "Popular" },
    { key: "top_rated", label: "Top Rated" },
    { key: "upcoming", label: "Upcoming" },
  ];

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", checkScroll);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col gap-3 md:flex-row md:gap-0 items-center justify-between px-4 py-3">

        <div className="relative w-full md:w-auto flex items-center">
          {showLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 z-10 bg-gray-800 text-white px-2 py-1 rounded-md md:hidden"
            >
              ◀
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide w-full md:w-auto px-6 md:px-0"
          >
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`flex-shrink-0 capitalize px-3 py-2 rounded-md text-sm font-medium transition ${
                  category === cat.key
                    ? "bg-yellow-400 text-gray-900"
                    : "text-gray-200 hover:bg-yellow-400 hover:text-gray-900"
                }`}
                onClick={() => setCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {showRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 z-10 bg-gray-800 text-white px-2 py-1 rounded-md md:hidden"
            >
              ▶
            </button>
          )}
        </div>

        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="🔍 Search movies..."
            className="w-full p-2 pl-3 rounded-md bg-gray-800 text-gray-200 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={query}
            onChange={handleSearch}
          />

          {recent.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {recent.map((r, i) => (
                <span
                  key={i}
                  onClick={() => {
                    setQuery(r);
                    setSearch(r);
                  }}
                  className="cursor-pointer bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition"
                >
                  {r}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}