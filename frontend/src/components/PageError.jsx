import { AlertTriangleIcon, ArrowRightIcon } from "lucide-react";
import { Link } from "react-router";

export function PageError({ message, action }) {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center py-24 text-center">
      {/* Icon */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-red-200 bg-red-50">
        <AlertTriangleIcon
          className="h-9 w-9 text-red-600"
          strokeWidth={1.8}
        />
      </div>

      {/* Heading */}
      <h2 className="mt-8 text-3xl font-semibold tracking-tight text-neutral-900">
        Something went wrong
      </h2>

      {/* Error message */}
      <p className="mt-4 max-w-lg text-base leading-7 text-neutral-500">
        {message}
      </p>

      {/* CTA */}
      {action && (
        <Link
          to={action.to}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-7 py-3 text-sm font-medium text-white transition hover:bg-black"
        >
          {action.label}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      )}

      {/* Helper text */}
      <p className="mt-8 text-sm text-neutral-400">
        If the problem continues, please refresh the page or try again in a
        few moments.
      </p>
    </section>
  );
}