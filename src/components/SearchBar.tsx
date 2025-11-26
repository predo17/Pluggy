import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";

export default function SearchBar() {
    const [search, setSearch] = useState("");
    const { startLoading, stopLoading } = useLoading();
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        startLoading();

        const query = search.trim().toLowerCase();
        if (!query) return;

        await new Promise(res => setTimeout(res, 1000));

        navigate(`/products?q=${query}`, {replace: true});
        window.location.reload();

        stopLoading();
    };

    return (
        <form
            className="relative w-full flex items-center"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                placeholder="Pesquisar..."
                className="flex-1 w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 tracking-wide"
                aria-label="Pesquisar"
                value={search}
                defaultValue={search || ""}
                onChange={(e) => setSearch(e.target.value)}
            />

            <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
                aria-hidden="true"
            />
        </form>
    );
}
