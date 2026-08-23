import { Link } from "react-router";
import { Armchair, HeadphonesIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 lg:px-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Armchair className="size-6 text-amber-400" aria-hidden strokeWidth={1.75} />
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
                Furnixa
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
              Built with care, made to share.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Shop
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-neutral-300 transition hover:text-white">
                  All products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-neutral-300 transition hover:text-white">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-neutral-300 transition hover:text-white">
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Support
            </h3>
            <div className="mt-4 flex items-start gap-2.5 text-sm text-neutral-300">
              <HeadphonesIcon
                className="mt-0.5 size-4 shrink-0 text-amber-400"
                aria-hidden
                strokeWidth={1.75}
              />
              <span>Order chat with video assembly help, right in your thread.</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Company
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              Built for people who care about clear specs and honest craft.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-neutral-500">
            © {new Date().getFullYear()} Furnixa · All prices in USD
          </p>
        </div>
      </div>
    </footer>
  );
}