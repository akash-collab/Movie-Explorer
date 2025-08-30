import { useState, useEffect } from "react";

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        visible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-5 right-5 bg-yellow-400 text-gray-900 px-5 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition text-lg sm:text-xl"
            >
                ↑
            </button>
        )
    );
}