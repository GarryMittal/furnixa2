import { ArrowRightIcon, ShoppingBagIcon, ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router";

export default function EmptyCart() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center py-24 text-center">
      {/* Icon */}
      <div className="flex h-24 w-24 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50">
        <ShoppingCartIcon
          className="h-10 w-10 text-neutral-700"
          strokeWidth={1.8}
        />
      </div>

      {/* Heading */}
      <h2 className="mt-8 text-4xl font-semibold tracking-tight text-neutral-900">
        Your cart feels a little empty
      </h2>

      {/* Description */}
      <p className="mt-4 max-w-xl text-base leading-7 text-neutral-500">
        Discover timeless furniture crafted to elevate every room of your
        home. Start exploring our collections and save your favourite pieces.
      </p>

      {/* CTA */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          to="/shop"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-black"
        >
          <ShoppingBagIcon className="h-4 w-4" />
          Continue Shopping
          <ArrowRightIcon className="h-4 w-4" />
        </Link>

        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-8 py-3 text-sm font-medium text-neutral-800 transition hover:border-black hover:bg-neutral-50"
        >
          Back to Home
        </Link>
      </div>

      
    </section>
  );
}