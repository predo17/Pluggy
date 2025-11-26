import { useNavigate } from "react-router-dom";
import { useLoading } from "../context/LoadingContext";

export default function BackButton({ className = "" }) {
    const navigate = useNavigate();
    const { startLoading, stopLoading } = useLoading();

    function handleBack() {
        startLoading();
        setTimeout(() => {
            navigate(-1);
            stopLoading();
        }, 1000);
    }

    return (
        <button
            onClick={handleBack}
            className={`text-blue-500 hover:text-blue-600 transition cursor-pointer ${className}`}
        >
            Voltar
        </button>
    );
}
