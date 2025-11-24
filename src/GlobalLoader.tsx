import { useLoading } from "./context/LoadingContext";

export default function GlobalLoader() {
  const { loading } = useLoading();

  return (
    <div
      className={`fixed top-0 left-0 h-1  bg-blue-500 transition-all duration-500 z-9999
      ${loading ? "w-full opacity-100" : "w-0 opacity-0"}
      `}
    />
  );
}
