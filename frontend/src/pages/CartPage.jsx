import useCartPage from "../hooks/useCartPage";
import { PageError } from "../components/PageError";
import EmptyCart from "../components/EmptyCart";
import { CartSkeleton } from "../components/LoadingSkeletons";
import {
  LogInIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  Trash2Icon,
} from "lucide-react";

import { IK_PRESETS, imageKitOptimizedUrl } from "../lib/imagekitUrl";
import { Link } from "react-router";
import { formatPrice } from "../utils/format";
import { Show, SignInButton } from "@clerk/react";

function CartPage() {
  const {
    checkout,
    checkoutLoading,
    items,
    lines,
    productsError,
    productsLoading,
    removeItem,
    setQty,
    subtotal,
  } = useCartPage();

  return (
    <div className="text-left">
      <h1 className="mb-8 flex items-center gap-2 text-3xl font-bold text-neutral-900">
        <ShoppingCartIcon className="size-8 text-amber-800" aria-hidden />
        Cart
      </h1>

      {items.length === 0 ? (
        <EmptyCart />
      ) : productsLoading ? (
        <CartSkeleton lines={items.length} />
      ) : productsError ? (
        <PageError message="Could not load product details. Refresh the page or try again shortly." />
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <ul className="space-y-4">
            {lines.map(({ line, product: p }) => (
              <li
                key={line.productId}
                className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-amber-800/30 sm:flex-row sm:items-center"
              >
                {p?.imageUrl ? (
                  <img
                    src={imageKitOptimizedUrl(p.imageUrl, IK_PRESETS.cartThumb)}
                    alt=""
                    className="h-24 w-24 shrink-0 rounded-xl object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="h-24 w-24 shrink-0 rounded-xl bg-neutral-100" />
                )}

                <div className="min-w-0 flex-1">
                  <div className="text-base font-semibold text-neutral-900">
                    {p ? (
                      <Link
                        to={`/product/${p.slug}`}
                        className="transition hover:text-amber-800"
                      >
                        {p.name}
                      </Link>
                    ) : (
                      "Unknown product"
                    )}
                  </div>
                  {p ? (
                    <p className="text-sm text-neutral-500">
                      {formatPrice(p.priceCents, p.currency)} each
                    </p>
                  ) : null}

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="text-sm text-neutral-500">Qty</span>

                    <div className="flex items-center rounded-lg border border-neutral-200">
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center text-neutral-600 transition hover:bg-neutral-50"
                        onClick={() =>
                          setQty(line.productId, line.quantity - 1)
                        }
                        aria-label={
                          line.quantity <= 1
                            ? "Remove from cart"
                            : "Decrease quantity"
                        }
                      >
                        <MinusIcon className="size-4" aria-hidden />
                      </button>
                      <span
                        className="flex h-8 min-w-10 items-center justify-center border-x border-neutral-200 bg-neutral-50 text-sm font-medium tabular-nums text-neutral-900"
                        aria-live="polite"
                      >
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center text-neutral-600 transition hover:bg-neutral-50 disabled:opacity-40"
                        onClick={() =>
                          setQty(
                            line.productId,
                            Math.min(99, line.quantity + 1),
                          )
                        }
                        disabled={line.quantity >= 99}
                        aria-label="Increase quantity"
                      >
                        <PlusIcon className="size-4" aria-hidden />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(line.productId)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50"
                      aria-label="Remove from cart"
                      title="Remove from cart"
                    >
                      <Trash2Icon className="size-4" aria-hidden />
                    </button>
                  </div>
                </div>

                <div className="text-right text-base font-semibold text-neutral-900 sm:min-w-[6rem]">
                  {p
                    ? formatPrice(p.priceCents * line.quantity, p.currency)
                    : "-"}
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Subtotal</span>
              <span className="font-semibold text-neutral-900">
                {formatPrice(subtotal, lines[0]?.product?.currency ?? "usd")}
              </span>
            </div>

            <Show when="signed-in">
              <button
                type="button"
                onClick={checkout}
                disabled={checkoutLoading}
                aria-busy={checkoutLoading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-60"
              >
                {checkoutLoading ? (
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    aria-hidden
                  />
                ) : (
                  <ShoppingCartIcon className="size-4" aria-hidden />
                )}
                {checkoutLoading ? "Opening checkout…" : "Checkout securely"}
              </button>
            </Show>

            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  type="button"
                  className="cursor-pointer mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 text-sm font-semibold text-neutral-900 transition hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
                >
                  <LogInIcon className="size-4" aria-hidden />
                  Sign in to checkout
                </button>
              </SignInButton>
            </Show>

            <p className="mt-4 flex items-start gap-2 text-xs text-neutral-500">
              <span>
                After payment, open your order for{" "}
                <strong className="text-amber-800">support chat</strong>. Video
                invites appear in that thread.
              </span>
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}

export default CartPage;
