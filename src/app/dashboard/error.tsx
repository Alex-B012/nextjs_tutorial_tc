"use client";

interface DashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  return (
    <div className="p-4 border-2 border-red-500 bg-red-50 rounded-lg text-red-700">
      <h2 className="font-bold text-lg">There is an error in Dashboard</h2>
      <p className="text-sm my-2 font-mono">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  );
}
