import { Link } from "react-router";
import { AlertTriangle, Home } from "lucide-react";

export function SentryErrorFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-white p-10 shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        <h1 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Something went wrong
        </h1>

        <p className="mt-3 text-center text-gray-600">
          We couldn't load this page. The issue has been automatically
          reported and we're already looking into it.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}