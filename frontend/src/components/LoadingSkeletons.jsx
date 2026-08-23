/** Shared loading placeholders matching Furnixa UI */

export function ProductPageSkeleton() {
  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <div className="aspect-square animate-pulse rounded-2xl bg-neutral-200" />

      <div className="space-y-6">
        <div className="h-10 w-2/3 animate-pulse rounded bg-neutral-200" />

        <div className="h-8 w-32 animate-pulse rounded bg-neutral-200" />

        <div className="space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-neutral-200" />
        </div>

        <div className="h-12 w-52 animate-pulse rounded-full bg-neutral-200" />
      </div>
    </div>
  );
}

export function CartSkeleton({ lines = 3 }) {
  const count = Math.min(Math.max(lines, 1), 8);

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_340px]">

      <div className="space-y-8">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex gap-6 border-b border-neutral-200 pb-8"
          >
            <div className="h-32 w-32 shrink-0 animate-pulse rounded-xl bg-neutral-200" />

            <div className="flex flex-1 flex-col justify-between">

              <div>
                <div className="h-6 w-56 animate-pulse rounded bg-neutral-200" />

                <div className="mt-4 h-4 w-24 animate-pulse rounded bg-neutral-200" />
              </div>

              <div className="mt-6 flex items-center gap-4">

                <div className="h-10 w-32 animate-pulse rounded-full bg-neutral-200" />

                <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-200" />

              </div>

            </div>

            <div className="flex items-start">
              <div className="h-6 w-20 animate-pulse rounded bg-neutral-200" />
            </div>

          </div>
        ))}
      </div>

      <aside className="h-fit rounded-2xl border border-neutral-200 p-8">

        <div className="flex justify-between">
          <div className="h-4 w-24 animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-20 animate-pulse rounded bg-neutral-200" />
        </div>

        <div className="mt-8 h-12 w-full animate-pulse rounded-full bg-neutral-200" />

        <div className="mt-5 space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-neutral-200" />
        </div>

      </aside>

    </div>
  );
}

export function OrdersListSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex items-center gap-6 rounded-2xl border border-neutral-200 p-6"
        >
          <div className="h-24 w-24 animate-pulse rounded-xl bg-neutral-200" />

          <div className="flex-1 space-y-4">
            <div className="h-6 w-56 animate-pulse rounded bg-neutral-200" />
            <div className="h-4 w-72 animate-pulse rounded bg-neutral-200" />
            <div className="h-4 w-40 animate-pulse rounded bg-neutral-200" />
          </div>

          <div className="h-10 w-28 animate-pulse rounded-full bg-neutral-200" />
        </div>
      ))}
    </div>
  );
}

export function AdminProductsTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200">

      <table className="w-full">

        <thead className="border-b border-neutral-200 bg-neutral-50">

          <tr>
            {[1,2,3,4,5,6].map((i)=>(
              <th key={i} className="px-6 py-4">
                <div className="mx-auto h-4 w-20 animate-pulse rounded bg-neutral-200" />
              </th>
            ))}
          </tr>

        </thead>

        <tbody>

          {[1,2,3,4,5].map((row)=>(
            <tr key={row} className="border-b border-neutral-100">

              <td className="px-6 py-5">
                <div className="mx-auto h-16 w-16 animate-pulse rounded-xl bg-neutral-200" />
              </td>

              {[1,2,3,4,5].map((col)=>(
                <td key={col} className="px-6 py-5">
                  <div className="h-5 w-24 animate-pulse rounded bg-neutral-200" />
                </td>
              ))}

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export function OrderDetailSkeleton() {
  return (
    <div className="space-y-10">

      <div className="h-10 w-56 animate-pulse rounded bg-neutral-200" />

      <div className="rounded-2xl border border-neutral-200 p-8">

        <div className="flex flex-col justify-between gap-8 lg:flex-row">

          <div className="space-y-5">

            <div className="h-6 w-64 animate-pulse rounded bg-neutral-200" />

            <div className="h-4 w-80 animate-pulse rounded bg-neutral-200" />

            <div className="h-4 w-64 animate-pulse rounded bg-neutral-200" />

          </div>

          <div className="space-y-4">

            <div className="h-8 w-28 animate-pulse rounded-full bg-neutral-200" />

            <div className="h-8 w-36 animate-pulse rounded bg-neutral-200" />

          </div>

        </div>

      </div>

      <div className="h-72 animate-pulse rounded-2xl bg-neutral-200" />

    </div>
  );
}

export function OrderVideoSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 animate-pulse rounded bg-neutral-200" />

      <div className="aspect-video animate-pulse rounded-2xl bg-neutral-200" />
    </div>
  );
}

export function OrderChatPanelSkeleton() {
  return (
    <div className="space-y-6">

      <div className="rounded-2xl border border-neutral-200 p-6">

        <div className="flex gap-4">

          <div className="h-14 w-14 animate-pulse rounded-full bg-neutral-200" />

          <div className="flex-1 space-y-3">

            <div className="h-5 w-52 animate-pulse rounded bg-neutral-200" />

            <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />

            <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-200" />

          </div>

        </div>

      </div>

      <div className="flex h-[560px] flex-col rounded-2xl border border-neutral-200">

        <div className="border-b border-neutral-200 p-6">
          <div className="h-6 w-48 animate-pulse rounded bg-neutral-200" />
        </div>

        <div className="flex flex-1 flex-col gap-6 p-6">

          <div className="h-20 w-3/4 animate-pulse rounded-2xl bg-neutral-200" />

          <div className="ml-auto h-20 w-2/3 animate-pulse rounded-2xl bg-neutral-200" />

          <div className="h-20 w-4/5 animate-pulse rounded-2xl bg-neutral-200" />

        </div>

        <div className="border-t border-neutral-200 p-6">
          <div className="h-12 w-full animate-pulse rounded-full bg-neutral-200" />
        </div>

      </div>

    </div>
  );
}