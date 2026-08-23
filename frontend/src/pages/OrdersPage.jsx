import useOrdersPage from "../hooks/useOrdersPage";
import { OrdersListSkeleton } from "../components/LoadingSkeletons";
import { PageError } from "../components/PageError";
import { ChevronRightIcon, PackageIcon } from "lucide-react";
import { Link } from "react-router";
import { OrderPreview } from "../components/OrderPreview";
import { formatOrderWhen, formatPrice } from "../utils/format";

const STATUS_STYLES = {
  paid: "bg-green-50 text-green-700",
  pending: "bg-amber-50 text-amber-800",
  failed: "bg-red-50 text-red-600",
};

function OrdersPage() {
  const { isLoading, error, orders, staff } = useOrdersPage();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-10 lg:px-16">
        <OrdersListSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-10 lg:px-16">
        <PageError
          message="Could not get orders at this moment"
          action={{ to: "/", label: "Back to Shop" }}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:px-10 lg:px-16">
      <h1 className="flex items-center gap-2 text-3xl font-bold text-neutral-900">
        <PackageIcon className="size-8 text-amber-800" aria-hidden />
        {staff ? "Orders" : "Your Orders"}
      </h1>

      <p className="mt-2 text-sm text-neutral-500">
        {staff
          ? "All store orders. Open one for customer support chat."
          : "Paid orders include customer support: click on an order to chat with our customer support."}
      </p>

      {orders.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-neutral-200 bg-white py-16 text-center">
          <p className="text-neutral-500">No orders yet</p>
          <Link
            to="/shop"
            className="mt-3 inline-block text-sm font-semibold text-amber-800 transition hover:text-amber-900"
          >
            Browse the shop
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {orders.map((o) => {
            const previewItems = o.previewItems ?? [];
            const totalUnits = previewItems.reduce(
              (sum, row) => sum + row.quantity,
              0,
            );
            const lineCount = previewItems.length;
            const summary =
              lineCount === 0
                ? "No line items"
                : lineCount === 1
                  ? `${totalUnits} ${totalUnits === 1 ? "item" : "items"}`
                  : `${lineCount} products · ${totalUnits} items`;

            return (
              <li key={o.id}>
                <Link
                  to={`/orders/${o.id}`}
                  className="group flex flex-wrap items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-amber-800/30 hover:shadow-md sm:gap-5"
                >
                  <OrderPreview items={previewItems} />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-neutral-400 sm:text-sm">
                        {o.id.slice(0, 8)}…
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                          STATUS_STYLES[o.status] ?? STATUS_STYLES.failed
                        }`}
                      >
                        {o.status}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-neutral-500">
                      {formatOrderWhen(o.createdAt)}
                    </p>

                    <p className="mt-2 text-sm text-neutral-600">{summary}</p>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                        Total
                      </p>
                      <p className="text-lg font-bold tabular-nums text-neutral-900 sm:text-xl">
                        {formatPrice(o.totalCents, "usd")}
                      </p>
                    </div>
                    <ChevronRightIcon
                      className="size-5 shrink-0 text-neutral-300 transition group-hover:translate-x-0.5 group-hover:text-amber-800"
                      aria-hidden
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default OrdersPage;