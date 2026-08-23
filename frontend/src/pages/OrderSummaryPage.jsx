import { ListOrderedIcon, PackageIcon } from "lucide-react";
import { Link, useOutletContext } from "react-router";
import { IK_PRESETS, imageKitOptimizedUrl } from "../lib/imagekitUrl";
import { formatPrice } from "../utils/format";

function OrderSummaryPage() {
  const { order, items } = useOutletContext();

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-900 text-white">
            <ListOrderedIcon size={20} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Order Summary
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {items.length} {items.length === 1 ? "product" : "products"} in
              this order
            </p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div>
        {items.map((row) => (
          <div
            key={row.id}
            className="flex flex-col gap-6 border-b border-gray-100 px-8 py-6 last:border-none lg:flex-row lg:items-center lg:justify-between"
          >
            {/* Left */}
            <div className="flex gap-5">
              <Link
                to={`/product/${row.product.slug}`}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50"
              >
                <div className="h-28 w-28">
                  {row.product.imageUrl ? (
                    <img
                      src={imageKitOptimizedUrl(
                        row.product.imageUrl,
                        IK_PRESETS.orderLineThumb,
                      )}
                      alt={row.product.name}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <PackageIcon className="text-gray-300" size={34} />
                    </div>
                  )}
                </div>
              </Link>

              <div className="flex flex-col justify-center">
                <Link
                  to={`/product/${row.product.slug}`}
                  className="text-lg font-semibold text-gray-900 transition hover:text-black"
                >
                  {row.product.name}
                </Link>

                {row.product.category && (
                  <p className="mt-1 text-sm text-gray-500">
                    {row.product.category}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>
                    Qty <strong>{row.quantity}</strong>
                  </span>

                  <span>
                    {formatPrice(row.unitPriceCents, row.product.currency)} each
                  </span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col items-start lg:items-end">
              <span className="text-xs uppercase tracking-widest text-gray-400">
                Subtotal
              </span>

              <span className="mt-2 text-2xl font-bold text-gray-900">
                {formatPrice(
                  row.quantity * row.unitPriceCents,
                  row.product.currency,
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between bg-gray-50 px-8 py-6">
        <span className="text-xl font-semibold text-gray-900">Total</span>

        <span className="text-3xl font-bold text-gray-900">
          {formatPrice(order.totalCents, "usd")}
        </span>
      </div>
    </div>
  );
}

export default OrderSummaryPage;
