import { Link, NavLink, Outlet } from "react-router";
import { OrderDetailSkeleton } from "../components/LoadingSkeletons";
import { PageError } from "../components/PageError";
import { useOrderDetailPage } from "../hooks/useOrderDetailPage";
import {
  ArrowLeftIcon,
  HeadphonesIcon,
  LayoutListIcon,
  LockIcon,
  MessageCircleIcon,
} from "lucide-react";
import { formatOrderWhen, formatPrice } from "../utils/format";

const STATUS_STYLES = {
  paid: "bg-green-50 text-green-700",
  pending: "bg-amber-50 text-amber-800",
  failed: "bg-red-50 text-red-600",
};

function tabClass({ isActive }) {
  return `flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-white text-neutral-900 shadow-sm"
      : "text-neutral-500 hover:text-neutral-900"
  }`;
}

function OrderDetailPage() {
  const { id, order, items, paid, isLoading, error } = useOrderDetailPage();

  if (isLoading) {
    return <OrderDetailSkeleton />;
  }

  if (error || !order) {
    return (
      <PageError message="Order not found." action={{ to: "/orders", label: "Back to orders" }} />
    );
  }

  const statusStyle = STATUS_STYLES[order.status] ?? STATUS_STYLES.failed;

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-10 text-left sm:px-10 lg:px-16">
      <Link
        to="/orders"
        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-amber-800"
      >
        <ArrowLeftIcon className="size-4" aria-hidden />
        Back to orders
      </Link>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-br from-amber-50 via-white to-neutral-50 px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                Order details
              </p>

              <h1 className="mt-1 font-mono text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                #{order.id.slice(0, 8)}
              </h1>

              <p className="mt-2 text-sm text-neutral-500">
                {formatOrderWhen(order.createdAt, { dateStyle: "full" })}
              </p>
              <p className="mt-2 break-all font-mono text-xs text-neutral-400">{order.id}</p>
            </div>

            <div className="flex flex-col gap-3 border-t border-neutral-200 pt-4 lg:border-t-0 lg:pt-0 lg:text-right">
              <span
                className={`w-fit rounded-full px-3 py-1 text-sm font-semibold capitalize lg:ml-auto ${statusStyle}`}
              >
                {order.status}
              </span>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                  Order total
                </p>
                <p className="text-2xl font-bold tabular-nums text-neutral-900 sm:text-3xl">
                  {formatPrice(order.totalCents, "usd")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 bg-neutral-50 px-5 py-4 sm:px-8">
          <p className="max-w-3xl text-sm leading-relaxed text-neutral-600">
            Need help with shipping or returns? Open the{" "}
            <strong className="text-neutral-900">Support chat</strong> tab after payment. Video
            call links are shared in that thread; everyone joins with the same link.
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 border-b border-neutral-200 pb-3">
          <HeadphonesIcon className="size-5 text-amber-800" aria-hidden />
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
            Customer support
          </h2>
        </div>

        <div className="mt-3 flex w-fit flex-wrap gap-1 rounded-xl bg-neutral-100 p-1">
          <NavLink to={`/orders/${id}`} end className={tabClass}>
            <LayoutListIcon className="size-4 shrink-0" aria-hidden />
            Summary
          </NavLink>

          {paid ? (
            <NavLink to={`/orders/${id}/chat`} className={tabClass}>
              <MessageCircleIcon className="size-4 shrink-0" aria-hidden />
              Support chat
            </NavLink>
          ) : (
            <span className="flex cursor-not-allowed items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-neutral-400">
              <LockIcon className="size-4 shrink-0" aria-hidden />
              Support chat
            </span>
          )}
        </div>

        {!paid ? (
          <div
            role="alert"
            className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          >
            <LockIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
            <span>
              Support unlocks when this order is marked{" "}
              <strong className="text-neutral-900">paid</strong> (once payment is confirmed).
            </span>
          </div>
        ) : null}

        <div className="mt-5">
          <Outlet context={{ order, items, paid }} />
        </div>
      </div>
    </div>
  );
}
export default OrderDetailPage;