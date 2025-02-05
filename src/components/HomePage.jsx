import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useGetStart } from "../hooks/useFetch";

function HomePage() {
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ["startData"],
    queryFn: useGetStart,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96 text-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome to Our App
        </h1>
        <p className="text-gray-600 mt-2">Click below to start the process.</p>

        {error && (
          <p className="text-red-500 text-sm mt-2">
            ⚠️ {error.message || "Something went wrong"}
          </p>
        )}

        <button
          onClick={() => navigate("/data")}
          disabled={isLoading}
          className={`mt-4 px-6 py-3 rounded-lg text-white text-lg font-medium transition-all duration-300
            ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {isLoading ? "Processing..." : "Start Process"}
        </button>
      </div>
    </div>
  );
}

export default HomePage;
